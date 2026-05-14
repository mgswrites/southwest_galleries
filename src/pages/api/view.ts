export const prerender = false;

import type { APIRoute } from 'astro';
import { recordListingView } from '../../lib/queries';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const id = Number(body?.id);
    if (!id || !Number.isInteger(id) || id <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid id' }), { status: 400 });
    }
    await recordListingView(id);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
};
