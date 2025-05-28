<script lang="ts">
	import type { SiteConfig } from '../types/config';

	interface OGProps {
		title?: string;
		description?: string;
		image?: string;
		url?: string;
		type?: 'website' | 'article';
		config: SiteConfig;
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			author?: string;
			tags?: string[];
		};
	}

	let { title, description, image, url, type = 'website', config, article }: OGProps = $props();

	// Fallback to site defaults
	const ogTitle = title || config.metadata.title;
	const ogDescription = description || config.metadata.description;
	const ogImage = image
		? `${config.metadata.url}${image}`
		: config.metadata.ogImage
			? `${config.metadata.url}${config.metadata.ogImage}`
			: `${config.metadata.url}${config.personal.profileImage}`;
	const ogUrl = url || config.metadata.url;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{ogTitle}</title>
	<meta name="title" content={ogTitle} />
	<meta name="description" content={ogDescription} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={ogUrl} />
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={ogDescription} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content={config.personal.name} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={ogUrl} />
	<meta property="twitter:title" content={ogTitle} />
	<meta property="twitter:description" content={ogDescription} />
	<meta property="twitter:image" content={ogImage} />
	{#if config.social.twitter}
		<meta
			property="twitter:creator"
			content={config.social.twitter
				.replace('https://twitter.com/', '@')
				.replace('https://x.com/', '@')}
		/>
	{/if}

	<!-- Article specific tags -->
	{#if type === 'article' && article}
		{#if article.publishedTime}
			<meta property="article:published_time" content={article.publishedTime} />
		{/if}
		{#if article.modifiedTime}
			<meta property="article:modified_time" content={article.modifiedTime} />
		{/if}
		{#if article.author}
			<meta property="article:author" content={article.author} />
		{/if}
		{#if article.tags && article.tags.length > 0}
			{#each article.tags as tag}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}
	{/if}

	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<meta name="author" content={config.personal.name} />
	<link rel="canonical" href={ogUrl} />

	<!-- JSON-LD Structured Data -->
	{#if type === 'website'}
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Person",
				"name": config.personal.name,
				"jobTitle": config.personal.title,
				"email": config.personal.email,
				"url": config.metadata.url,
				"image": `${config.metadata.url}${config.personal.profileImage}`,
				"sameAs": [
					config.social.github,
					config.social.linkedin,
					config.social.twitter,
					config.social.bluesky
				].filter(Boolean)
			})}
		</script>
	{:else if type === 'article' && article}
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Article",
				"headline": ogTitle,
				"description": ogDescription,
				"image": ogImage,
				"url": ogUrl,
				"datePublished": article.publishedTime,
				"dateModified": article.modifiedTime || article.publishedTime,
				"author": {
					"@type": "Person",
					"name": article.author || config.personal.name,
					"url": config.metadata.url
				},
				"publisher": {
					"@type": "Person",
					"name": config.personal.name,
					"url": config.metadata.url
				}
			})}
		</script>
	{/if}
</svelte:head>
