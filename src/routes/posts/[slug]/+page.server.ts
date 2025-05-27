import type { PageServerLoad } from './$types';

import { getPostBySlug } from '$lib/server/datocms.server';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const project = await getPostBySlug(slug);
	if (!project) {
		return { status: 404, error: new Error('Project not found') };
	}
	return { project };
};
