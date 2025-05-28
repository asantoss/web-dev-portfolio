import type { PageServerLoad } from './$types';
import { getPaginatedPosts } from '$lib/server/queries';

export const load: PageServerLoad = async () => {
	try {
		const { posts } = await getPaginatedPosts(1, 5);

		if (!posts || posts.length === 0) {
			return {
				posts: [
					{
						title: 'No posts found',
						description: 'There are currently no posts available.',
						slug: 'no-posts',
						image: null,
						tags: []
					}
				]
			};
		}

		return { posts };
	} catch (error) {
		console.error('Error loading posts:', error);

		return {
			posts: [
				{
					title: 'Error loading posts',
					description: 'Something went wrong fetching content.',
					slug: 'error',
					image: null,
					tags: []
				}
			]
		};
	}
};
