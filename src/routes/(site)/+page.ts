import { categories, posts, work, type Category } from '#lib/content.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const groups = (Object.keys(categories) as Category[])
		.map((category) => ({
			category,
			label: categories[category],
			entries: work.filter((entry) => entry.category === category)
		}))
		.filter((group) => group.entries.length > 0);

	return { groups, posts: posts.slice(0, 5) };
};
