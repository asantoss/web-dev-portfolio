<script lang="ts">
	import '../app.css';
	import ThemeToggle from '../components/theme-toggle.svelte';

	let { children } = $props();
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	onMount(() => {
		themeStore.set(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
	});
	const year = new Date().getFullYear();
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link
	href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
	rel="stylesheet"
/>
<svelte:head>
	<title>Alexander Santos</title>
</svelte:head>
<ThemeToggle />
<main
	class="font-lexend flex min-h-screen flex-col items-center bg-gray-100 px-4 pt-8 leading-relaxed text-gray-900 transition-colors duration-300 md:pt-16 dark:bg-black dark:text-gray-200"
>
	<div class=" flex max-w-xl flex-grow flex-col justify-between gap-y-12">
		{@render children()}
	</div>
	<footer class=" mt-32 flex h-16 flex-col justify-center text-center text-xs leading-normal">
		© {year}. All rights reserved.
	</footer>
</main>
