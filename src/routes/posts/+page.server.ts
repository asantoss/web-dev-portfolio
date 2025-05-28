import type { PageServerLoad } from './$types';
import { getPaginatedPosts } from '$lib/server/queries';

export const load: PageServerLoad = async () => {
	try {
		const { posts } = await getPaginatedPosts(1, 25);

		if (!posts || posts.length === 0) {
			return {
				posts: []
			};
		}

		return { posts };
	} catch (error) {
		console.error('Error loading posts:', error);

		return {
			posts: []
		};
	}
};
