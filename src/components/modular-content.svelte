<script lang="ts">
	export interface ModularBlock {
		_modelApiKey: string;
		text?: string;
		image?: {
			url: string;
			alt?: string;
		};
		quote?: string;
	}

	export let blocks: ModularBlock[] = [];
</script>

<div class="flex flex-col gap-6">
	{#each blocks as block}
		{#if block._modelApiKey === 'text_block' && block.text}
			<div class="prose prose-sm dark:prose-invert">
				{@html block.text}
			</div>
		{:else if block._modelApiKey === 'image_block' && block.image?.url}
			<img
				src={block.image.url}
				alt={block.image.alt || ''}
				class="w-full rounded-lg border object-cover"
				loading="lazy"
			/>
		{:else if block._modelApiKey === 'quote_block' && block.quote}
			<blockquote class="text-muted-foreground border-l-4 pl-4 italic">
				{block.quote}
			</blockquote>
		{:else}
			<p class="text-warning text-sm">
				⚠️ Unknown or incomplete block: <code>{block._modelApiKey}</code>
			</p>
		{/if}
	{/each}
</div>
