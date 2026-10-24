import { error } from '@sveltejs/kit';
import { writing } from '#lib/content.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => writing.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const entry = writing.find(({ slug }) => slug === params.slug);
	if (!entry) error(404, 'Not found');
	return { entry };
};
