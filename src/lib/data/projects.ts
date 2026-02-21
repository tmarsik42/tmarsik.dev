import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		id: 'portfolio-v2',
		title: 'Portfolio v2.0',
		status: 'STABLE',
		stack: ['SvelteKit', 'TypeScript', 'Svelte 5'],
		description:
			'Data-driven personal portfolio with blueprint / technical drawing aesthetic. Runes-based reactivity, config-driven content.',
		specification: {
			'RENDER': 'SSR',
			'UI': 'Blueprint CSS',
			'A11Y': 'AA_COMPLIANT',
			'FRAMEWORK': 'SvelteKit 2',
		},
		links: [
			{ label: 'REPO', url: 'https://github.com/tmarsik42/tmarsik.dev' },
		],
	},
	{
		id: 'cad-viewer',
		title: 'CAD Viewer Proto',
		status: 'BETA',
		stack: ['TypeScript', 'Canvas API', 'WebGL'],
		description: 'Lightweight 2D viewport with zoom and pan. Technical drawing overlay and coordinate readout.',
		specification: {
			'RENDER': 'CLIENT',
			'UI': 'Blueprint CSS',
			'VIEWPORT': '2D_CANVAS',
			'A11Y': 'AA_COMPLIANT',
		},
		links: [
			{ label: 'DEMO', url: '#' },
			{ label: 'REPO', url: 'https://github.com/tmarsik42' },
		],
	},
];
