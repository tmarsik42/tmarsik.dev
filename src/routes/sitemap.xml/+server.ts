import { posts, work } from '#lib/content.ts';
import { site } from '#lib/site.ts';
import type { RequestHandler } from './$types';

// Endpoints don't inherit prerender from +layout.ts
export const prerender = true;

export const GET: RequestHandler = () => {
	const paths = [
		'/',
		'/writing',
		'/colophon',
		...work.map((e) => e.href),
		...posts.map((e) => e.href)
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `	<url><loc>${site.url}${path}</loc></url>`).join('\n')}
</urlset>
`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
