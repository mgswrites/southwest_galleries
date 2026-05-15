export const prerender = false;

import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const PRICE_IDS: Record<string, string> = {
  basic: import.meta.env.STRIPE_PRICE_BASIC,
  featured: import.meta.env.STRIPE_PRICE_FEATURED,
  premium: import.meta.env.STRIPE_PRICE_PREMIUM,
};

export const POST: APIRoute = async ({ request }) => {
  const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { listing_id, listing_slug, tier, email, name } = body;

  if (!listing_id || !listing_slug || !tier || !email) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const priceId = PRICE_IDS[tier];
  if (!priceId) {
    return new Response(JSON.stringify({ error: 'Invalid tier' }), { status: 400 });
  }

  const baseUrl = 'https://southwestgalleries.com';

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email,
    metadata: { listing_id, listing_slug, tier, owner_name: name ?? '' },
    subscription_data: {
      metadata: { listing_id, listing_slug, tier },
    },
    success_url: `${baseUrl}/listing/${listing_slug}/?upgraded=1`,
    cancel_url: `${baseUrl}/upgrade/${listing_slug}/`,
  });

  return new Response(JSON.stringify({ url: session.url }), { status: 200 });
};
