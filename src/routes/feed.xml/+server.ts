import { posts } from '#lib/content.ts';
import { site } from '#lib/site.ts';
import type { RequestHandler } from './$types';

// Endpoints don't inherit prerender from +layout.ts
export const prerender = true;

const escapeXml = (s: string) => s.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);

export const GET: RequestHandler = () => {
	const items = posts
		.slice(0, 20)
		.map(
			(post) => `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${site.url}${post.href}</link>
			<guid>${site.url}${post.href}</guid>
			<pubDate>${post.date.toUTCString()}</pubDate>
			<description>${escapeXml(post.description)}</description>
		</item>`
		)
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(site.title)}</title>
		<link>${site.url}</link>
		<description>${escapeXml(site.description)}</description>
		<language>en</language>
		<atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />${items}
	</channel>
</rss>
`;

	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
