export interface SiteConfig {
	personal: {
		name: string;
		title: string;
		email: string;
		profileImage: string;
		profileImageAlt: string;
	};
	bio: {
		content: string;
	};
	social: {
		linkedin?: string;
		github?: string;
		twitter?: string;
		bluesky?: string;
		website?: string;
	};
	skills: {
		name: string;
		icon:
			| 'svelte'
			| 'vue'
			| 'react'
			| 'nextjs'
			| 'tailwind'
			| 'expo'
			| 'salesforce'
			| 'azure'
			| 'vercel';
		order: number;
	}[];
	metadata: {
		title: string;
		description: string;
		url: string;
		copyright: string;
		ogImage?: string;
	};
}
