import { error } from '@sveltejs/kit';
import { work } from '#lib/content.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const entry = work.find(({ slug }) => slug === params.slug);
	if (!entry) error(404, 'Not found');
	return { entry };
};
