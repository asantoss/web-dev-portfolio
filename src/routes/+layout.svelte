<script lang="ts">
	import '../app.css';
	import ThemeToggle from '../components/theme-toggle.svelte';

	let { children } = $props();
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	onMount(() => {
		themeStore.set(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
	});
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link
	href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
	rel="stylesheet"
/>
<ThemeToggle />
<main class="flex min-h-screen flex-col transition-colors duration-300 items-center px-4 pt-8 leading-relaxed md:pt-16 bg-gray-100 text-gray-900 dark:bg-black dark:text-gray-200">
	{@render children()}
</main>
