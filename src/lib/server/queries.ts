import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '../../types/cms';

const postsDir = path.resolve('src/posts');

export const getAllPosts = async (): Promise<Post[]> => {
	const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));

	const posts = files.map((filename) => {
		const slug = filename.replace(/\.md$/, '');
		const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
		const { data, content } = matter(raw);

		return {
			slug,
			title: data.title,
			date: data.date,
			description: data.description || '',
			image: data.image || null,
			tags: data.tags || [],
			draft: data.draft || false,
			content
		} satisfies Post;
	});

	return posts
		.filter((p) => !p.draft && new Date(p.date) <= new Date())
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
	const filePath = path.join(postsDir, `${slug}.md`);

	if (!fs.existsSync(filePath)) return null;

	const raw = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(raw);

	if (data.draft || new Date(data.date) > new Date()) return null;

	return {
		slug,
		title: data.title,
		date: data.date,
		description: data.description || '',
		image: data.image || null,
		tags: data.tags || [],
		draft: data.draft || false,
		content
	};
};

export const getPaginatedPosts = async (
	page: number,
	limit: number
): Promise<{
	posts: Post[];
	total: number;
	pages: number;
	currentPage: number;
}> => {
	const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));

	const allPosts: Post[] = files.map((filename) => {
		const slug = filename.replace(/\.md$/, '');
		const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
		const { data, content } = matter(raw);

		return {
			slug,
			title: data.title,
			date: data.date,
			description: data.description || '',
			image: data.image || null,
			tags: data.tags || [],
			draft: data.draft || false,
			content
		} satisfies Post;
	});

	const filtered = allPosts
		.filter((p) => !p.draft && new Date(p.date) <= new Date())
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const total = filtered.length;
	const pages = Math.ceil(total / limit);
	const offset = (page - 1) * limit;

	return {
		posts: filtered.slice(offset, offset + limit),
		total,
		pages,
		currentPage: page
	};
};
