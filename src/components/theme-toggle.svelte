<script lang="ts">
	import { themeStore } from '$lib/stores/theme';
	import { Moon, Sun } from 'lucide-svelte';
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';

	let theme: 'light' | 'dark' = 'light';
	const y = spring(0, { stiffness: 0.2, damping: 0.4 });

	const unsubscribe = themeStore.subscribe((value) => {
		theme = value;
		y.set(value === 'dark' ? 1 : 0);
	});

	onMount(() => {
		return () => unsubscribe();
	});

	function toggle() {
		themeStore.toggle();
	}
</script>

<button
	on:click={toggle}
	aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
	class="group cursor-pointer absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-800 shadow-sm outline-none transition hover:scale-105 focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
>
	<Sun
		class="absolute h-5 w-5 transition-opacity duration-300 dark:block hidden"
	/>
	<Moon
		class="absolute h-5 w-5 transition-opacity duration-300 dark:hidden"
	/>
</button>

<style>
	.hidden {
		opacity: 0;
		transform: scale(0.95);
		pointer-events: none;
	}
</style>
