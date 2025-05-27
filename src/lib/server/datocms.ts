// src/lib/datocms.ts
import { SiteClient } from 'datocms-client';
import { DATOCMS_API_TOKEN } from '$env/static/private';

if (!DATOCMS_API_TOKEN) {
	throw new Error('Missing DATOCMS_API_TOKEN in environment variables');
}

const client = new SiteClient(DATOCMS_API_TOKEN);

/**
 * Fetch all posts ordered by publish date (newest first)
 */
export async function getAllPosts() {
	return client.items.all({
		filter: { type: 'post' },
		order_by: ''
	});
}

/** Fetch the latest 5 posts */
export async function getLatestPosts(limit = 5) {
	return client.items.all({
		filter: { type: 'post' },
		order_by: '_firstPublishedAt_DESC',
		limit
	});
}

/**
 * Fetch a single post by its slug
 */
export async function getPostBySlug(slug: string) {
	const items = await client.items.all({
		filter: {
			type: 'post',
			fields: { slug: { eq: slug } }
		},
		limit: 1
	});
	return items[0] || null;
}
