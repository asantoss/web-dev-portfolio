import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const config = {
	client: {
		id: GITHUB_CLIENT_ID,
		secret: GITHUB_CLIENT_SECRET
	},
	auth: {
		tokenHost: 'https://github.com',
		tokenPath: '/login/oauth/access_token',
		authorizePath: '/login/oauth/authorize'
	},
	scope: 'repo'
};
