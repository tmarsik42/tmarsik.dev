import { error } from '@sveltejs/kit';
import { notes } from '#lib/content.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const entry = notes.find(({ slug }) => slug === params.slug);
	if (!entry) error(404, 'Not found');
	return { entry };
};
