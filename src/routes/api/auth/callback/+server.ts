/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from './$types';
import { AuthorizationCode } from 'simple-oauth2';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

function renderBody(status: string, token?: string): string {
	return `
		<script>
			const receiveMessage = (message) => {
			debugger;
				window.opener.postMessage(
					'authorization:github:${status}:${JSON.stringify({ token })}',
					message.origin
				);

				window.removeEventListener("message", receiveMessage, false);
			};
			window.addEventListener("message", receiveMessage, false);

			window.opener.postMessage("authorizing:github", "*");
		</script>
	`;
}

export const GET: RequestHandler = async ({ url }) => {
	const provider = url.searchParams.get('provider');
	const code = url.searchParams.get('code');
	console.log('Received callback with provider:', provider, 'and code:', code);
	if (provider !== 'github') {
		return new Response('Invalid provider', { status: 400 });
	}

	if (!code) {
		return new Response('Missing code', { status: 400 });
	}

	const client = new AuthorizationCode({
		auth: {
			tokenHost: 'https://github.com',
			tokenPath: '/login/oauth/access_token',
			authorizePath: '/login/oauth/authorize'
		},
		client: {
			id: GITHUB_CLIENT_ID,
			secret: GITHUB_CLIENT_SECRET
		}
	});

	const tokenParams = {
		code,
		redirect_uri: `https://alexsantos.dev/auth/callback?provider=github`
	};

	try {
		const accessToken = await client.getToken(tokenParams);
		const token = accessToken.token['access_token'];
		console.log(accessToken);

		const body = renderBody('success', token as string);
		return new Response(body, {
			status: 200,
			headers: { 'Content-Type': 'text/html' }
		});
	} catch (err: any) {
		console.error('OAuth error:', err.message);
		const body = renderBody('error');
		return new Response(body, {
			status: 500,
			headers: { 'Content-Type': 'text/html' }
		});
	}
};
