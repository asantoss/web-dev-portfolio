<script lang="ts">
	import { onMount } from 'svelte';
	onMount(async () => {
		const mod = await import('@sveltia/cms');

		mod.init();
	});
</script>
