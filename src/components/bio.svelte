<script lang="ts">
	import type { SiteConfig } from '../types/config';
	import { marked } from 'marked';
	import { SiGithub, SiX, SiBluesky, SiGmail } from '@icons-pack/svelte-simple-icons';
	import Linkedin from '$lib/icons/linkedin.svelte';
	let { config }: { config: SiteConfig } = $props();
	const { personal, bio, social } = config;

	// Convert markdown to HTML for bio content
	const bioHtml = marked(bio.content);

	// Filter out empty social links and create array for display
	const socialLinks = [
		{ name: 'GitHub', url: social.github, icon: SiGithub },
		{ name: 'LinkedIn', url: social.linkedin, icon: Linkedin },
		{ name: 'Bluesky', url: social.bluesky, icon: SiBluesky },
		{ name: 'Twitter', url: social.twitter, icon: SiX },
		{ name: 'Email', url: `mailto:${personal.email}`, icon: SiGmail }
	].filter((link) => link.url && link.url.trim() !== '');
</script>

<div class="flex h-10 items-center text-base"><h2 class="leading-normal">About me</h2></div>
<div class="flex w-full items-stretch justify-stretch">
	<div class="bg-border h-0.25 w-full"></div>
</div>
<div class="py-2 text-sm">
	<div class="prose prose-sm dark:prose-invert leading-normal">
		{@html bioHtml}
	</div>

	{#if socialLinks.length > 0}
		<div class="mt-4 flex flex-wrap items-center gap-3 leading-normal">
			{#each socialLinks as link}
				<a
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					class="00 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-300"
					aria-label="{link.name} profile"
				>
					<link.icon />
					{link.name}
				</a>
			{/each}
		</div>
	{/if}
</div>
