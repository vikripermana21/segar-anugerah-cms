<script lang="ts">
	import Tooltip from '@/components/tooltip.svelte';
	import Pencil from '@lucide/svelte/icons/pencil';
	import LayersPlus from '@lucide/svelte/icons/layers-plus';
	import {
		dataSelected,
		isOpenCreateProductCategoryVariationOption,
		isOpenDeleteProductCategoryVariation,
		isOpenEditProductCategoryVariation
	} from '../stores.ts';
	import Trash from '@lucide/svelte/icons/trash';

	let { id, name }: { id: string; name: string } = $props();
</script>

<div class="flex justify-end gap-2">
	<Tooltip text="Edit">
		{#snippet trigger()}
			<button
				onclick={() => {
					isOpenEditProductCategoryVariation.set(true);
					dataSelected.set({
						id,
						name
					});
				}}
			>
				<Pencil class="w-4 cursor-pointer stroke-yellow-700" />
			</button>
		{/snippet}
	</Tooltip>
	<Tooltip text="Add Option">
		{#snippet trigger()}
			<button
				onclick={() => {
					isOpenCreateProductCategoryVariationOption.set(true);
					dataSelected.set({
						id,
						name
					});
				}}
			>
				<LayersPlus class="w-4 cursor-pointer stroke-blue-700" />
			</button>
		{/snippet}
	</Tooltip>
	<Tooltip text="Delete">
		{#snippet trigger()}
			<button
				onclick={() => {
					isOpenDeleteProductCategoryVariation.set(true);
					dataSelected.set({
						id,
						name
					});
				}}
			>
				<Trash class="w-4 cursor-pointer stroke-red-700" />
			</button>
		{/snippet}
	</Tooltip>
</div>
