<script>
	const { children, title } = $props();
</script>

<div class="flex h-fit w-full flex-col items-center justify-center gap-2 text-center">
	<div
		class="bg-surface flex aspect-square w-full flex-col items-center justify-center rounded-md p-4"
	>
		{@render children()}
	</div>
	<h3 class="truncate text-sm">{title}</h3>
</div>
