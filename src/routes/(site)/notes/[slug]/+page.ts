import { error } from '@sveltejs/kit';
import { notes } from '#lib/content.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => notes.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const entry = notes.find(({ slug }) => slug === params.slug);
	if (!entry) error(404, 'Not found');
	return { entry };
};
