<script lang="ts">
	import type { Post } from '../types/cms';

	export let post: Post;
</script>

<div
	class="group bg-surface relative flex flex-col gap-2 overflow-hidden rounded-xl border p-2 opacity-100 hover:outline-2"
>
	<!-- stretch link covers the whole card -->
	<a href={`/posts/${post.slug}`} class="absolute inset-0 z-0" aria-label={post.title}></a>

	<div class="relative z-10 flex items-center justify-between">
		<h3 class="flex items-center px-2 py-1 text-sm font-semibold capitalize">
			{post.title}
		</h3>
		<div class="flex items-center justify-center gap-2 rounded p-2 text-xs">
			{#if post.presentation}
				<a
					href={`/slides/${post.slug}`}
					class="rounded bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-500 transition hover:bg-blue-500/20"
				>
					Slides
				</a>
			{/if}
			<span class="text-gray-500 dark:text-gray-400">
				{new Date(post.date).toLocaleDateString()}
			</span>
			<svg
				focusable="false"
				fill="currentColor"
				width="16"
				height="16"
				viewBox="0 0 32 32"
				aria-hidden="true"
				class="transition-all duration-300 group-hover:rotate-45"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M10 6L10 8 22.59 8 6 24.59 7.41 26 24 9.41 24 22 26 22 26 6 10 6z" />
			</svg>
		</div>
	</div>

	<div class="flex w-full items-stretch justify-stretch px-2">
		<div class="bg-border h-0.25 w-full"></div>
	</div>

	<div class="px-2 py-1 text-sm">
		<p class="leading-normal text-gray-600 dark:text-gray-400">
			{post.description ?? 'No description provided.'}
		</p>
	</div>
</div>
