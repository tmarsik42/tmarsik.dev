export interface LinkItem {
	label: string;
	href: string;
}

export const siteInfo = {
	name: 'TMARSIK.DEV',
	project: 'PERSONAL SITE',
	rev: 'REWRITE_V2.0',

	bio: 'Software Engineer focused on performant and accessible web systems.',

	links: [
		{ label: 'GITHUB', href: 'https://github.com/tmarsik42' },
		{ label: 'LINKEDIN', href: 'https://linkedin.com/in/tmarsik-dev' },
		{ label: 'EMAIL', href: 'mailto:tad.marsik@gmail.com' },
	] as LinkItem[],
} as const;
