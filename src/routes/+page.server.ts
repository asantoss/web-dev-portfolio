import type { PageServerLoad } from './$types';
import { getPaginatedPosts } from '$lib/server/queries';
import { getSiteConfig } from '$lib/server/queries';

export const load: PageServerLoad = async () => {
	try {
		const { posts } = await getPaginatedPosts(1, 5);
		const config = getSiteConfig();

		if (!posts || posts.length === 0) {
			return {
				posts: [],
				config
			};
		}

		return { posts, config };
	} catch (error) {
		console.error('Error loading posts:', error);
		const config = getSiteConfig();

		return {
			posts: [],
			config
		};
	}
};
