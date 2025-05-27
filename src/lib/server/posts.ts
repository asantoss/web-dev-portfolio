import { createClient } from '@sanity/client';
import groq from 'groq';

export const sanity = createClient({
	projectId: 'your_project_id',
	dataset: 'production',
	apiVersion: '2023-01-01',
	useCdn: true
});

export const getAllPosts = async () => {
	return sanity.fetch(groq`
    *[_type == "post"] | order(publishedAt desc)[0...10] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      "authorName": author->name,
      categories[]->{title},
      body
    }
  `);
};

export const getPostBySlug = async (slug: string) => {
	return sanity.fetch(
		groq`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      "authorName": author->name,
      categories[]->{title},
      body
    }
  `,
		{ slug }
	);
};
