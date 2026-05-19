<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	<style>html, body { background: #1e1e2e; margin: 0; overflow: hidden; }</style>
</svelte:head>

{@render children()}
