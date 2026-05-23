<script lang="ts">
	import OgMeta from '../../../components/og-meta.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const { post, config } = data;

	// Format dates for OG tags
	const publishedTime = new Date(post.date).toISOString();
	const postUrl = `${config.metadata.url}/posts/${post.slug}`;
</script>

<!-- Article-specific OG tags -->
<OgMeta
	title={post.title}
	description={post.description ?? `${post.title} - ${config.personal.name}`}
	image={post.image}
	url={postUrl}
	type="article"
	{config}
	article={{
		publishedTime,
		author: config.personal.name,
		tags: post.tags
	}}
/>

<div class="font-lexend mx-auto gap-y-8 px-4">
	<div class="mt-10 flex items-center justify-between">
		<a
			href="/"
			class="inline-flex items-center text-sm text-blue-500 underline transition hover:text-blue-600"
		>
			← Home
		</a>
		{#if post.presentation}
			<a
				href={`/slides/${post.slug}`}
				class="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-500 transition hover:bg-blue-500/20"
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<rect x="2" y="3" width="20" height="14" rx="2" />
					<path d="M8 21h8M12 17v4" />
				</svg>
				View as Slides
			</a>
		{/if}
	</div>
	<header class="flex flex-col gap-y-2">
		<h1 class="text-2xl leading-tight font-semibold">{post.title}</h1>
		<p class="text-sm text-gray-500">
			{new Date(post.date).toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>

		{#if post.image}
			<img
				src={post.image}
				alt={post.title}
				class="aspect-videorounded-lg mt-4 border object-cover"
				loading="lazy"
			/>
		{/if}
	</header>

	<article class="prose dark:prose-invert">
		{@html post.html}
	</article>
</div>
