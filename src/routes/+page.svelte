<script lang="ts">
	import PostCard from '../components/post-card.svelte';
	import Profile from '../components/profile.svelte';
	import Bio from '../components/bio.svelte';
	import Skills from '../components/skills.svelte';
	let { data } = $props();
</script>

<div class="flex flex-col gap-10">
	<header class="flex flex-col gap-y-2">
		<Profile />
	</header>
	<section class="flex flex-col gap-y-2">
		<Bio />
	</section>
	<section class="flex flex-col gap-y-2">
		<a href="/posts" class="flex h-10 items-center text-base hover:underline">
			<h2 class="leading-normal">Posts</h2>
		</a>
		<div class="flex flex-col gap-4">
			{#each data.posts as post}
				<PostCard {post} />
			{/each}
		</div>
	</section>
	<section class="flex flex-col gap-y-2">
		<Skills />
	</section>
</div>
