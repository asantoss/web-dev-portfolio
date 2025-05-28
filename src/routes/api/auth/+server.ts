import { AuthorizationCode } from 'simple-oauth2';
import { redirect } from '@sveltejs/kit';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export async function GET({ url }) {
	const provider = url.searchParams.get('provider');
	const siteId = url.searchParams.get('site_id');
	const scope = url.searchParams.get('scope') || 'repo';

	if (provider !== 'github') {
		return new Response('Unsupported provider', { status: 400 });
	}

	if (!siteId) {
		return new Response('Missing site_id', { status: 400 });
	}

	const client = new AuthorizationCode({
		client: {
			id: GITHUB_CLIENT_ID,
			secret: GITHUB_CLIENT_SECRET
		},
		auth: {
			tokenHost: 'https://github.com',
			authorizePath: '/login/oauth/authorize'
		}
	});

	const state = crypto.randomUUID();

	const redirect_uri = `${siteId}/auth/callback?provider=${provider}&site_id=${encodeURIComponent(siteId)}`;

	const authUrl = client.authorizeURL({
		redirect_uri,
		scope,
		state
	});

	throw redirect(302, authUrl);
}
