import type { LayoutServerLoad } from './$types';
import { getSiteConfig } from '$lib/server/queries';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
	const config = getSiteConfig();

	return {
		config
	};
};
