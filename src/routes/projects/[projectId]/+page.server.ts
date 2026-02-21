import { projects } from '$lib/data/projects';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
    const project = projects.find((p) => p.id === params.projectId);

    if (!project) {
        throw error(404, {
            message: 'PROJECT_NOT_FOUND'
        });
    }

    return {
        project
    };
};
