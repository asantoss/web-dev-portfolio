<script>
	import Nextjs from '../lib/icons/nextjs.svelte';
	import Tailwind from '../lib/icons/tailwind.svelte';
	import Expo from '../lib/icons/expo.svelte';
	import React from '../lib/icons/react.svelte';
	import Vue from '../lib/icons/vue.svelte';
	import Svelte from '../lib/icons/svelte.svelte';
	import Salesforce from '../lib/icons/salesforce.svelte';
	import Azure from '../lib/icons/azure.svelte';
	import Skill from '../components/skill.svelte';
</script>

<div class="flex h-10 items-center text-base">
	<h2 class="leading-normal">What I use</h2>
</div>
<div class="flex w-full items-stretch justify-stretch">
	<div class="bg-border h-0.25 w-full"></div>
</div>
<div class="grid grid-cols-4 place-content-between gap-10 py-3 sm:grid-cols-6">
	<Skill title="Svelte">
		<Svelte />
	</Skill>
	<Skill title="Vue">
		<Vue />
	</Skill>
	<Skill title="React">
		<React />
	</Skill>
	<Skill title="Next.js">
		<Nextjs />
	</Skill>
	<Skill title="Tailwind CSS">
		<Tailwind />
	</Skill>
	<Skill title="Expo">
		<Expo />
	</Skill>
	<Skill title="Salesforce">
		<Salesforce />
	</Skill>
	<Skill title="Azure">
		<Azure />
	</Skill>
</div>
