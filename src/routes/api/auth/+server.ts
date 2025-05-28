import { json } from '@sveltejs/kit';

const CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

export async function GET({ url }) {
	const code = url.searchParams.get('code');

	if (!code) {
		return json({ error: 'Missing code' }, { status: 400 });
	}

	const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			code
		})
	});

	const tokenJson = await tokenRes.json();
	return json(tokenJson);
}
