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
	const slides = await Promise.all(
		rawSlides.map(async (s) => {
			const trimmed = s.trim();
			const bgMatch = trimmed.match(/<!--\s*bg:\s*(.+?)\s*-->/);
			const bg = bgMatch ? bgMatch[1] : undefined;
			const clean = trimmed.replace(/<!--\s*bg:\s*.+?\s*-->\n?/, '');
			const html = await marked(clean);
			return { html, bg };
		})
	);

	return {
		title: post.title,
		description: post.description,
		slides
	};
};
