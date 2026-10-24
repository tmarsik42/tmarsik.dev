import { readFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { site } from '#lib/site.ts';
import { palette } from '#lib/theme.ts';

// satori can't read woff2 or variable fonts, so it gets the static woff files
const font = (subset: string, weight: 400 | 600) => ({
	// satori falls back between families, not between files of one family
	name: subset === 'latin' ? 'Recursive' : 'Recursive Ext',
	data: readFileSync(
		`node_modules/@fontsource/recursive/files/recursive-${subset}-${weight}-normal.woff`
	),
	weight,
	style: 'normal' as const
});
const fonts = [
	font('latin', 400),
	font('latin', 600),
	font('latin-ext', 400),
	font('latin-ext', 600)
];

type Style = Record<string, string | number>;
const h = (type: string, style: Style, children?: unknown) => ({
	type,
	props: { style, children }
});

export async function renderOg({
	label,
	title,
	text
}: {
	label?: string;
	title: string;
	text?: string;
}) {
	const tree = h(
		'div',
		{
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			padding: 72,
			// satori defaults to content-box, padding would grow the image
			boxSizing: 'border-box',
			background: palette.bg,
			color: palette.text,
			fontFamily: 'Recursive, Recursive Ext'
		},
		[
			h('div', { display: 'flex', flexDirection: 'column', gap: 24 }, [
				label && h('div', { fontSize: 28, color: palette.muted }, label),
				h('div', { fontSize: 68, fontWeight: 600, lineHeight: 1.15, maxWidth: 1000 }, title),
				text &&
					h('div', { fontSize: 32, color: palette.muted, lineHeight: 1.4, maxWidth: 1000 }, text)
			]),
			h('div', { display: 'flex', justifyContent: 'space-between', fontSize: 28 }, [
				title !== site.title && h('div', { fontWeight: 600 }, site.title),
				h('div', { marginLeft: 'auto', color: palette.accent }, new URL(site.url).host)
			])
		]
	);

	const svg = await satori(tree as Parameters<typeof satori>[0], {
		width: 1200,
		height: 630,
		fonts
	});
	return new Resvg(svg).render().asPng();
}
