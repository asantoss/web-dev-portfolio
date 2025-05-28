import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/server/queries';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const post = await getPostBySlug(slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	const html = marked(post.content);

	return { post: { ...post, html } };
};
