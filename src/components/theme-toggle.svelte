<script lang="ts">
	import { themeStore } from '$lib/stores/theme';
	import { Moon, Sun } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let theme: 'light' | 'dark' = 'light';

	const unsubscribe = themeStore.subscribe((value) => {
		theme = value;
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
	class="group absolute top-4 right-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-800 shadow-sm transition outline-none hover:scale-105 focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
>
	<Sun class="absolute hidden h-5 w-5 transition-opacity duration-300 dark:block" />
	<Moon class="absolute h-5 w-5 transition-opacity duration-300 dark:hidden" />
</button>
