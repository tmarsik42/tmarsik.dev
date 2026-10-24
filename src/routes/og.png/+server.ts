import { renderOg } from '#lib/server/og.ts';
import { site } from '#lib/site.ts';
import type { RequestHandler } from './$types';

// Endpoints don't inherit prerender from +layout.ts
export const prerender = true;

export const GET: RequestHandler = async () => {
	const png = await renderOg({ title: site.title, text: site.description });
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
