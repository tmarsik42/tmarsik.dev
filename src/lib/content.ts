import { z } from 'zod';
import type { Component } from 'svelte';
import { dev } from '$app/env';

// mdsvex parses unquoted YAML dates as ISO timestamps
const date = z.union([z.iso.date(), z.iso.datetime()]).transform((d) => new Date(d));

const base = {
	title: z.string().min(1),
	date,
	description: z.string().min(1),
	tags: z.array(z.string()).default([]),
	draft: z.boolean().default(false)
};

export const categories = {
	featured: 'Selected work',
	'open-source': 'Open source',
	tool: 'Tools & experiments',
	archive: 'Archive'
} as const;
export type Category = keyof typeof categories;

const workSchema = z.object({
	...base,
	category: z.enum(Object.keys(categories) as [Category, ...Category[]]),
	role: z.string().min(1),
	period: z.string().min(1),
	stack: z.array(z.string()),
	links: z.array(z.object({ label: z.string(), url: z.url() })).default([])
});
const postSchema = z.object(base);

type Module = { default: Component; metadata?: Record<string, unknown> };
type Kind = 'work' | 'writing' | 'notes';

function load<K extends Kind, S extends z.ZodType<{ date: Date; draft: boolean }>>(
	kind: K,
	schema: S,
	files: Record<string, Module>
) {
	return Object.entries(files)
		.map(([path, mod]) => {
			const result = schema.safeParse(mod.metadata ?? {});
			if (!result.success) {
				throw new Error(`Invalid frontmatter in ${path}:\n${z.prettifyError(result.error)}`);
			}
			const slug = path.slice(path.lastIndexOf('/') + 1, -'.md'.length);
			return { ...result.data, kind, slug, href: `/${kind}/${slug}`, component: mod.default };
		})
		.filter((entry) => dev || !entry.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export const work = load(
	'work',
	workSchema,
	import.meta.glob<Module>('/src/content/work/*.md', { eager: true })
);

export const writing = load(
	'writing',
	postSchema,
	import.meta.glob<Module>('/src/content/writing/*.md', { eager: true })
);
export const notes = load(
	'notes',
	postSchema,
	import.meta.glob<Module>('/src/content/notes/*.md', { eager: true })
);

export type WorkEntry = (typeof work)[number];
export type PostEntry = (typeof writing)[number] | (typeof notes)[number];
export type Entry = WorkEntry | PostEntry;

export const posts: PostEntry[] = [...writing, ...notes].sort(
	(a, b) => b.date.getTime() - a.date.getTime()
);

export function labelOf(entry: Entry) {
	if (entry.kind === 'work') return categories[entry.category];
	return entry.kind === 'notes' ? 'Note' : 'Article';
}

export function formatDate(date: Date) {
	return date.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	});
}
