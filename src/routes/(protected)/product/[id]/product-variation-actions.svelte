<script lang="ts">
	import Tooltip from '@/components/tooltip.svelte';
	import Pencil from '@lucide/svelte/icons/pencil';
	import LayersPlus from '@lucide/svelte/icons/layers-plus';

	let { id }: { id: string } = $props();
</script>

<div class="flex justify-end gap-2">
	<Tooltip text="Edit">
		{#snippet trigger()}
			<button
				onclick={() => {
					console.log(id);
					// goto(resolve(`/product-category/${id}`));
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
					console.log(id);
					// goto(resolve(`/product-category/${id}`));
				}}
			>
				<LayersPlus class="w-4 cursor-pointer stroke-blue-700" />
			</button>
		{/snippet}
	</Tooltip>
</div>
