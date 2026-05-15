export const prerender = false;

import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import sql from '../../lib/db';

const PRICE_TO_TIER: Record<string, string> = {
  [import.meta.env.STRIPE_PRICE_BASIC]: 'basic',
  [import.meta.env.STRIPE_PRICE_FEATURED]: 'featured',
  [import.meta.env.STRIPE_PRICE_PREMIUM]: 'premium',
};

async function upsertOwner(listingId: number, tier: string, customerId: string, subscriptionId: string) {
  await sql`
    INSERT INTO listing_owners (listing_id, tier, stripe_customer_id, stripe_subscription_id, subscription_start)
    VALUES (${listingId}, ${tier}::listing_tier, ${customerId}, ${subscriptionId}, now())
    ON CONFLICT (listing_id) DO UPDATE SET
      tier = ${tier}::listing_tier,
      stripe_customer_id = ${customerId},
      stripe_subscription_id = ${subscriptionId},
      subscription_start = COALESCE(listing_owners.subscription_start, now()),
      updated_at = now()
  `;
  await sql`
    UPDATE listings SET tier = ${tier}::listing_tier, updated_at = now() WHERE id = ${listingId}
  `;
}

async function downgradeOwner(subscriptionId: string) {
  await sql`
    UPDATE listing_owners
    SET tier = 'free'::listing_tier, subscription_end = now(), updated_at = now()
    WHERE stripe_subscription_id = ${subscriptionId}
  `;
  const rows = await sql`
    SELECT listing_id FROM listing_owners WHERE stripe_subscription_id = ${subscriptionId}
  `;
  for (const row of rows) {
    await sql`UPDATE listings SET tier = 'free'::listing_tier WHERE id = ${row.listing_id}`;
  }
}

export const POST: APIRoute = async ({ request }) => {
  const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

  const rawBody = await request.text();
  const sig = request.headers.get('stripe-signature') ?? '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return new Response(`Webhook signature verification failed: ${msg}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== 'subscription') break;
        const { listing_id, listing_slug: _slug, tier, owner_name } = session.metadata ?? {};
        if (!listing_id || !tier) break;
        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id ?? '';
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id ?? '';
        const email = session.customer_email ?? session.customer_details?.email ?? '';
        if (email || owner_name) {
          await sql`
            INSERT INTO listing_owners (listing_id, email, name, tier, stripe_customer_id, stripe_subscription_id, subscription_start)
            VALUES (${Number(listing_id)}, ${email}, ${owner_name ?? ''}, ${tier}::listing_tier, ${customerId}, ${subscriptionId}, now())
            ON CONFLICT (listing_id) DO UPDATE SET
              email = COALESCE(EXCLUDED.email, listing_owners.email),
              name = COALESCE(EXCLUDED.name, listing_owners.name),
              tier = EXCLUDED.tier,
              stripe_customer_id = EXCLUDED.stripe_customer_id,
              stripe_subscription_id = EXCLUDED.stripe_subscription_id,
              subscription_start = COALESCE(listing_owners.subscription_start, now()),
              updated_at = now()
          `;
        } else {
          await upsertOwner(Number(listing_id), tier, customerId, subscriptionId);
        }
        await sql`UPDATE listings SET tier = ${tier}::listing_tier WHERE id = ${Number(listing_id)}`;
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const priceId = sub.items.data[0]?.price?.id;
        const tier = priceId ? (PRICE_TO_TIER[priceId] ?? null) : null;
        if (!tier) break;
        const listingId = sub.metadata?.listing_id ? Number(sub.metadata.listing_id) : null;
        if (!listingId) break;
        await sql`UPDATE listing_owners SET tier = ${tier}::listing_tier, updated_at = now() WHERE stripe_subscription_id = ${sub.id}`;
        await sql`UPDATE listings SET tier = ${tier}::listing_tier WHERE id = ${listingId}`;
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await downgradeOwner(sub.id);
        break;
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err);
    return new Response('Internal error', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};
