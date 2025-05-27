import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/server/sanity';



export const load: PageServerLoad = async () => {
	const posts = await getAllPosts();

	return {
		posts:
			posts.length > 0
				? posts
				: [
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
