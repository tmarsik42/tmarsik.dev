export type ProjectStatus = 'STABLE' | 'BETA' | 'ALPHA' | 'LEGACY';

export interface ProjectLink {
	label: string;
	url: string;
}

export interface Project {
	id: string;
	title: string;
	status: ProjectStatus;
	stack: string[];
	description: string;
	specification: Record<string, string>;
	links: ProjectLink[];
}
