<script lang="ts">
	import { Separator } from '@/components/ui/separator/index.js';
	import { dataSelected, isOpenEditProductCategoryVariationOption } from '../stores.ts';

	let {
		options
	}: {
		options: Array<{ id: string; value: string; variation_id: string }>;
	} = $props();
</script>

<div class="flex gap-3">
	{#each options as option, i (option.id)}
		<div class="flex gap-2">
			<button
				class="cursor-pointer text-muted-foreground"
				onclick={() => {
					isOpenEditProductCategoryVariationOption.set(true);
					dataSelected.set({
						id: option.id,
						name: option.value
					});
				}}
			>
				{option.value}
			</button>
			{#if i + 1 !== options.length}
				<Separator orientation="vertical" />
			{/if}
		</div>
	{:else}
		<p class="text-muted-foreground">-</p>
	{/each}
</div>
