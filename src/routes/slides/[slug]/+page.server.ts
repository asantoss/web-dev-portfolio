import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/server/queries';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const post = await getPostBySlug(slug);

	if (!post || !post.presentation) {
		throw error(404, 'Presentation not found');
	}

	const rawSlides = post.content.split(/\n\*{3}\n|\n---\n/);
	const slides = await Promise.all(rawSlides.map((s) => marked(s.trim())));

	return {
		title: post.title,
		description: post.description,
		slides
	};
};
