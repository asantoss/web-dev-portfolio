import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

function createThemeStore() {
	const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
	const systemPrefersDark =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-color-scheme: dark)').matches
			: false;

	const initial: Theme =
		stored === 'light' || stored === 'dark' ? stored : systemPrefersDark ? 'dark' : 'light';
	const { subscribe, set, update } = writable<Theme>(initial);

	// Watch for system preference changes
	if (typeof window !== 'undefined') {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			const stored = localStorage.getItem('theme');
			if (!stored) {
				set(e.matches ? 'dark' : 'light');
			}
		});
	}

	return {
		subscribe,
		set: (value: Theme) => {
			localStorage.setItem('theme', value);
			document.documentElement.classList.toggle('dark', value === 'dark');
			set(value);
		},
		toggle: () => {
			// Use update instead of set for functional updates
			update((prev: Theme) => {
				const next: Theme = prev === 'dark' ? 'light' : 'dark';
				localStorage.setItem('theme', next);
				document.documentElement.classList.toggle('dark', next === 'dark');
				return next;
			});
		}
	};
}

export const themeStore = createThemeStore();
