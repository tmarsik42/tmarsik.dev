import { error } from '@sveltejs/kit';
import { formatDate, labelOf, posts, work } from '#lib/content.ts';
import { renderOg } from '#lib/server/og.ts';
import type { EntryGenerator, RequestHandler } from './$types';

// Endpoints don't inherit prerender from +layout.ts
export const prerender = true;

const all = [...work, ...posts];

export const entries: EntryGenerator = () => all.map(({ kind, slug }) => ({ kind, slug }));

export const GET: RequestHandler = async ({ params }) => {
	const entry = all.find(({ kind, slug }) => kind === params.kind && slug === params.slug);
	if (!entry) error(404, 'Not found');

	const png = await renderOg({
		label: `${labelOf(entry)}, ${formatDate(entry.date)}`,
		title: entry.title
	});
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
