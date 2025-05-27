import type { PageServerLoad } from './$types';

import { getPostBySlug } from '$lib/server/sanity';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const post = await getPostBySlug(slug);
	if (!post) {
		return { status: 404, error: new Error('Post not found') };
	}
	return { post };
};
