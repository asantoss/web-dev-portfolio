// src/routes/api/webhooks/summarize/+server.ts
import { json } from '@sveltejs/kit';
import { summarizeWithAI } from '$lib/server/summarize';
import { DATOCMS_API_TOKEN, WEBHOOK_SECRET } from '$env/static/private';

const DATO_BASE_URL = 'https://site-api.datocms.com';

export async function POST({ request }) {
	// 🔐 Verify custom header
	const auth = request.headers.get('authorization');
	if (!auth || auth !== `Bearer ${WEBHOOK_SECRET}`) {
		console.warn('🚨 Unauthorized webhook request');
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	// ✅ Parse body
	const { entity } = await request.json();
	const itemId = entity?.id;
	const model = entity?.item_type?.api_key;

	if (model !== 'post' || !itemId) {
		return json({ message: 'Skipped non-post record' }, { status: 204 });
	}

	// 📦 Fetch the post item
	const postRes = await fetch(`${DATO_BASE_URL}/items/${itemId}`, {
		headers: {
			Authorization: `Bearer ${DATOCMS_API_TOKEN}`,
			Accept: 'application/json'
		}
	});

	if (!postRes.ok) {
		console.error('❌ Failed to fetch post:', await postRes.text());
		return json({ error: 'Fetch failed' }, { status: 500 });
	}

	const post = await postRes.json();

	// ✨ Summarize
	let summary: string;
	try {
		summary = await summarizeWithAI(post.content);
	} catch (err) {
		console.error('❌ Summarization error:', err);
		return json({ error: 'Summarization failed' }, { status: 500 });
	}

	// 📝 Update post with summary
	const updateRes = await fetch(`${DATO_BASE_URL}/items/${itemId}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${DATOCMS_API_TOKEN}`,
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			data: {
				type: 'item',
				id: itemId,
				attributes: {
					summary
				}
			}
		})
	});

	if (!updateRes.ok) {
		console.error('❌ Failed to update summary:', await updateRes.text());
		return json({ error: 'Update failed' }, { status: 500 });
	}

	return json({ success: true, itemId, summary });
}
