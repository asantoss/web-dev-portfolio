export interface Post {
	slug: string;
	title: string;
	date: string;
	description?: string;
	image?: string;
	tags?: string[];
	draft?: boolean;
	content: string;
}
