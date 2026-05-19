import { env } from '$env/dynamic/private';

export const config = {
	client: {
		id: env.GITHUB_CLIENT_ID,
		secret: env.GITHUB_CLIENT_SECRET
	},
	auth: {
		tokenHost: 'https://github.com',
		tokenPath: '/login/oauth/access_token',
		authorizePath: '/login/oauth/authorize'
	},
	scope: 'repo'
};
