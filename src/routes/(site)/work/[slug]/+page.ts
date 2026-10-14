import { error } from '@sveltejs/kit';
import { work } from '#lib/content.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => work.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const entry = work.find(({ slug }) => slug === params.slug);
	if (!entry) error(404, 'Not found');
	return { entry };
};
