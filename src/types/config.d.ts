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
		website?: string;
		bluesky?: string;
	};
	skills: {
		name: string;
		icon: string;
		order: number;
	}[];
	metadata: {
		title: string;
		description: string;
		url: string;
		copyright: string;
	};
}
