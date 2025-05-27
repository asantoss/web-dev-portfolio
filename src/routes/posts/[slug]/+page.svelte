<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	const { post } = data;
</script>

<svelte:head>
	<title>{post.title} - Alexander Santos</title>
</svelte:head>

<div class="font-lexend mx-auto flex max-w-xl flex-col gap-y-8">
	<header class="flex flex-col gap-y-2">
		<h1 class="text-2xl leading-tight font-semibold">{post.title}</h1>
		<p class="text-sm text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>

		{#if post.mainImage?.asset?._ref}
			<img
				src={`https://cdn.sanity.io/images/YOUR_PROJECT_ID/production/${post.mainImage.asset._ref.replace('image-', '').replace(/-(jpg|png|webp)$/, '.$1')}`}
				alt={post.title}
				class="mt-4 aspect-video rounded-lg border object-cover"
			/>
		{/if}
	</header>

	<div class="prose dark:prose-invert min-h-64">
		{@html post.body}
	</div>

	<a
		href="/"
		class="mt-10 inline-flex items-center text-sm text-blue-500 underline transition hover:text-blue-600"
	>
		← Back to portfolio
	</a>
</div>
