import type { PageServerLoad } from './$types';

import { getLatestPosts } from '$lib/server/datocms';

export const load: PageServerLoad = async () => {
	const posts = await getLatestPosts();
	return {
		posts: posts || [
			{
				title: 'No posts found',
				description: 'There are currently no posts available.',
				slug: 'no-posts',
				image: null,
				tags: []
			}
		]
	};
};
