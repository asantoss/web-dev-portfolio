<script lang="ts">
	import type { PageData } from './$types';
	import ModularContent from '../../../components/modular-content.svelte';

	export let data: PageData;
	const { project } = data;
	console.log('Project data:', project);
</script>

<svelte:head>
	<title>{project.title} - Alexander Santos</title>
</svelte:head>

<div class="font-lexend mx-auto flex max-w-xl flex-col gap-y-8">
	<header class="flex flex-col gap-y-2">
		<h1 class="text-2xl leading-tight font-semibold">{project.title}</h1>
		<p class="text-sm text-gray-500">{new Date(project.meta.publishedAt).toLocaleDateString()}</p>
		{#if project.thumbnail}
			<img
				src={project.thumbnail.url}
				alt={project.title}
				class="mt-4 aspect-video rounded-lg border object-cover"
			/>
		{/if}
	</header>
	<div class="min-h-64">
		<ModularContent blocks={project.content} />
	</div>

	<a
		href="/"
		class="mt-10 inline-flex items-center text-sm text-blue-500 underline transition hover:text-blue-600"
	>
		← Back to portfolio
	</a>
</div>
