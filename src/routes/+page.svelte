<script lang="ts">
	import Nextjs from '../lib/icons/nextjs.svelte';
	import Tailwind from '../lib/icons/tailwind.svelte';
	import Expo from '../lib/icons/expo.svelte';
	import React from '../lib/icons/react.svelte';
	import Vue from '../lib/icons/vue.svelte';
	import Svelte from '../lib/icons/svelte.svelte';
	import Salesforce from '../lib/icons/salesforce.svelte';
	import Azure from '../lib/icons/azure.svelte';
	import Skill from '../components/skill.svelte';
	import PostCard from '../components/post-card.svelte';
	import type { PageProps } from './$types';

	const year = new Date().getFullYear();
	const email = 'asantos@lightningleap.us';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Alexander Santos</title>
</svelte:head>
<div class="font-lexend flex h-full max-w-xl flex-col justify-between gap-y-12">
	<div class="flex flex-col gap-10">
		<header class="flex flex-col gap-y-2">
			<img
				class="rounded-full border"
				width="80"
				height="80"
				src="/profile.png"
				alt="alex and his daughter"
			/>
			<div class="flex h-10 items-center gap-2 text-xl">
				<h1 class="leading-normal">Alexander Santos</h1>
			</div>
			<div class="flex w-full items-stretch justify-stretch">
				<div class="bg-border h-0.25 w-full"></div>
			</div>
			<div class="flex h-fit items-center py-2 text-sm">
				<p class="leading-normal">Software Consultant</p>
			</div>
		</header>
		<section class="flex flex-col gap-y-2">
			<div class="flex h-10 items-center text-base"><h2 class="leading-normal">About me</h2></div>
			<div class="flex w-full items-stretch justify-stretch">
				<div class="bg-border h-0.25 w-full"></div>
			</div>
			<div class="py-2 text-sm">
				<p class="leading-normal">
					Hello! I'm Alexander Santos, a passionate software consultant who loves building creative
					solutions. I enjoy tinkering with hardware, exploring new web frameworks, and have
					experience in Salesforce development and administration. Whether it's coding, configuring
					systems, or experimenting with the latest tech, I'm always eager to learn and take on new
					challenges.<br />Feel free to reach out to
					<span class="inline-flex items-center gap-1 px-1"
						><a
							href="mailto:{email}"
							class="inline-flex w-fit cursor-pointer items-center justify-center gap-2 text-sm underline duration-300 hover:underline"
							>me</a
						></span
					>
					if you have any questions or just want to chat.
				</p>
			</div>
		</section>
		<section class="flex flex-col gap-y-2">
			<div class="flex h-10 items-center text-base">
				<h2 class="leading-normal">Posts</h2>
			</div>
			<div class="flex flex-col gap-4">
				{#each data.posts as post}
					<PostCard {post} />
				{/each}
			</div>
		</section>
		<section class="flex flex-col gap-y-2">
			<div class="flex h-10 items-center text-base"><h2 class="leading-normal">What I use</h2></div>
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
		</section>
	</div>
	<footer class="mt-32 flex h-16 flex-col justify-center text-center text-xs leading-normal">
		© <!-- -->{year}<!-- -->. All rights reserved.
	</footer>
</div>
