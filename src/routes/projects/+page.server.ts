import { projects } from '$lib/data/projects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    return {
        projects: projects
    };
};
