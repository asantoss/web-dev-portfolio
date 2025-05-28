import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.resolve('src/posts');

export interface Post {
	slug: string;
	title: string;
	publishedAt: string;
	description?: string;
	image?: string;
	tags?: string[];
	draft?: boolean;
	content: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
	const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));

	const posts = files.map((filename) => {
		const slug = filename.replace(/\.md$/, '');
		const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
		const { data, content } = matter(raw);

		return {
			slug,
			title: data.title,
			publishedAt: data.publishedAt,
			description: data.description || '',
			image: data.image || null,
			tags: data.tags || [],
			draft: data.draft || false,
			content
		} satisfies Post;
	});

	return posts
		.filter((p) => !p.draft && new Date(p.publishedAt) <= new Date())
		.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
	const filePath = path.join(postsDir, `${slug}.md`);

	if (!fs.existsSync(filePath)) return null;

	const raw = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(raw);

	if (data.draft || new Date(data.publishedAt) > new Date()) return null;

	return {
		slug,
		title: data.title,
		publishedAt: data.publishedAt,
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
			publishedAt: data.publishedAt,
			description: data.description || '',
			image: data.image || null,
			tags: data.tags || [],
			draft: data.draft || false,
			content
		} satisfies Post;
	});

	const filtered = allPosts
		.filter((p) => !p.draft && new Date(p.publishedAt) <= new Date())
		.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

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
