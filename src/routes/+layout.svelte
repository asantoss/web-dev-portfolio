<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link
	href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
	rel="stylesheet"
/>
<main class="flex min-h-screen flex-col items-center px-4 pt-16 leading-relaxed">
	{@render children()}
</main>
