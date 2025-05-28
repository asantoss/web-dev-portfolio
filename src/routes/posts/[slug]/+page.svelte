<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	const { post } = data;
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={post.description ?? post.title} />
</svelte:head>

<div class="font-lexend mx-auto flex max-w-xl flex-col gap-y-8 px-4">
	<a
		href="/"
		class="mt-10 inline-flex items-center text-sm text-blue-500 underline transition hover:text-blue-600"
	>
		← Home
	</a>
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
				class="mt-4 aspect-video rounded-lg border object-cover"
				loading="lazy"
			/>
		{/if}
	</header>

	<article class="prose dark:prose-invert">
		{@html post.html}
	</article>
</div>
