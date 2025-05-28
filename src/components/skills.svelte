<script lang="ts">
	import type { SiteConfig } from '../types/config';
	import Nextjs from '../lib/icons/nextjs.svelte';
	import Tailwind from '../lib/icons/tailwind.svelte';
	import Expo from '../lib/icons/expo.svelte';
	import React from '../lib/icons/react.svelte';
	import Vue from '../lib/icons/vue.svelte';
	import Svelte from '../lib/icons/svelte.svelte';
	import Salesforce from '../lib/icons/salesforce.svelte';
	import Azure from '../lib/icons/azure.svelte';
	import Vercel from '../lib/icons/vercel.svelte';
	import Skill from '../components/skill.svelte';

	let { config }: { config: SiteConfig } = $props();

	// Map icon names to components
	const iconMap = {
		nextjs: Nextjs,
		tailwind: Tailwind,
		expo: Expo,
		react: React,
		vue: Vue,
		svelte: Svelte,
		salesforce: Salesforce,
		azure: Azure,
		vercel: Vercel
	} as Record<string, typeof Nextjs>;

	// Sort skills by order
	const sortedSkills = config.skills.sort((a, b) => a.order - b.order);
</script>

<div class="flex h-10 items-center text-base">
	<h2 class="leading-normal">What I use</h2>
</div>
<div class="flex w-full items-stretch justify-stretch">
	<div class="bg-border h-0.25 w-full"></div>
</div>
<div class="grid grid-cols-4 place-content-between gap-10 py-3 sm:grid-cols-6">
	{#each sortedSkills as skill}
		{@const Icon = iconMap[skill.icon]}
		<Skill title={skill.name}>
			<Icon />
		</Skill>
	{/each}
</div>
