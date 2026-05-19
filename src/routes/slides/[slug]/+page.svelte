<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { title, description, slides } = data;

	let deckEl: HTMLElement;

	onMount(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let deck: any = null;

		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';

		(async () => {
			await import('reveal.js/reveal.css');
			await import('reveal.js/theme/black.css');
			// reveal.js uses `export =`; Vite wraps it so the constructor is on .default at runtime
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const mod = (await import('reveal.js' as any)) as any;
			const Reveal = mod.default ?? mod;
			deck = new Reveal(deckEl, {
				hash: true,
				transition: 'slide',
				backgroundTransition: 'fade',
				controls: true,
				controlsTutorial: true,
				progress: true,
				center: true,
				slideNumber: 'c/t',
				touch: true,
				width: 1280,
				height: 720,
				margin: 0.04,
				minScale: 0.1,
				maxScale: 2.0
			});
			await deck.initialize();
		})();

		return () => {
			deck?.destroy();
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
		};
	});
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<div class="presentation-root">
	<div bind:this={deckEl} class="reveal">
		<div class="slides">
			{#each slides as slide}
				<section
					data-background-image={slide.bg ?? undefined}
					data-background-opacity={slide.bg ? '0.25' : undefined}
				>{@html slide.html}</section>
			{/each}
		</div>
	</div>

	<a href="/" class="exit-btn" title="Back to site">✕</a>
</div>

<style>
	.presentation-root {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: #191919;
		touch-action: none;
	}

	.reveal {
		width: 100%;
		height: 100%;
		touch-action: none;
	}

	.exit-btn {
		position: fixed;
		top: 1rem;
		right: 1.25rem;
		z-index: 10000;
		color: rgba(255, 255, 255, 0.5);
		font-size: 1rem;
		line-height: 1;
		text-decoration: none;
		transition: color 0.2s;
	}

	.exit-btn:hover {
		color: #fff;
	}

	/* Slide content overrides */
	:global(.reveal h1) {
		font-size: 2.2em;
		font-weight: 700;
		line-height: 1.2;
	}

	:global(.reveal h2) {
		font-size: 1.6em;
		font-weight: 600;
	}

	:global(.reveal h3) {
		font-size: 1.1em;
		font-weight: 400;
		color: #aaa;
	}

	:global(.reveal ul) {
		list-style: none;
		padding: 0;
	}

	:global(.reveal ul li) {
		padding: 0.3em 0;
		font-size: 0.9em;
	}

	:global(.reveal ul li::before) {
		content: '→ ';
		color: #6495ed;
	}

	:global(.reveal p) {
		font-size: 0.9em;
		line-height: 1.6;
		color: #ccc;
	}

	:global(.reveal strong) {
		color: #fff;
	}

	:global(.reveal blockquote) {
		background: rgba(255, 255, 255, 0.05);
		border-left: 3px solid #6495ed;
		padding: 0.8em 1.2em;
		border-radius: 0 4px 4px 0;
		font-style: normal;
	}

	:global(.reveal blockquote p) {
		margin: 0;
		color: #e0e0e0;
	}

	:global(.reveal .progress span) {
		background: #6495ed;
	}

	:global(.reveal table) {
		display: block;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		max-width: 100%;
		font-size: 0.75em;
	}

	:global(.reveal .controls) {
		bottom: 1rem;
	}

	:global(.reveal .controls button) {
		color: #6495ed;
	}

	@media (max-width: 600px) {
		:global(.reveal h1) {
			font-size: 1.6em;
		}

		:global(.reveal h2) {
			font-size: 1.2em;
		}

		:global(.reveal p),
		:global(.reveal ul li) {
			font-size: 0.8em;
		}
	}
</style>
