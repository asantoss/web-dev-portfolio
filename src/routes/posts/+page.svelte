<script lang="ts">
	import PostCard from '../../components/post-card.svelte';
	import OGMeta from '../../components/og-meta.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { config } = data;
</script>

<OGMeta
	title={`Posts - ${config.personal.name}`}
	description={`Articles and insights by ${config.personal.name}`}
	url={`${config.metadata.url}/posts`}
	{config}
	type="website"
/>

<div class="flex flex-col gap-10">
	<a
		href="/"
		class=" inline-flex items-center text-sm text-blue-500 underline transition hover:text-blue-600"
	>
		← Home
	</a>
	<section class=" gap-y-2">
		<div class="flex h-10 items-center text-base">
			<h2 class="leading-normal">Posts</h2>
		</div>
		<div class=" gap-4">
			{#each data.posts as post (post.slug)}
				<PostCard {post} />
			{/each}
		</div>
	</section>
</div>
