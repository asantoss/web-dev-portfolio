<script lang="ts">
	import type { SiteConfig } from '../types/config';

	let { config }: { config: SiteConfig } = $props();
	const { personal } = config;
</script>

<img
	class="rounded-full border"
	width="80"
	height="80"
	src={personal.profileImage}
	alt={personal.profileImageAlt}
/>
<div class="flex h-10 items-center gap-2 text-xl">
	<h1 class="leading-normal">{personal.name}</h1>
</div>
<div class="flex w-full items-stretch justify-stretch">
	<div class="bg-border h-0.25 w-full"></div>
</div>
<div class="flex h-fit items-center py-2 text-sm">
	<p class="leading-normal">{personal.title}</p>
</div>
