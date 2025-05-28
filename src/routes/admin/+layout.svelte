<script lang="ts">
	let { children }: { children: any } = $props();
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link
	href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
	rel="stylesheet"
/>
<svelte:head>
	<title>Admin</title>
</svelte:head>
<main>
	{@render children()}
</main>
