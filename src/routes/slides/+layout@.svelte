<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
</svelte:head>

{@render children()}
