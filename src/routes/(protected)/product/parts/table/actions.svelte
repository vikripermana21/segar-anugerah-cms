<script lang="ts">
	import Tooltip from '@/components/tooltip.svelte';
	import Trash from '@lucide/svelte/icons/trash';
	import Pencil from '@lucide/svelte/icons/pencil';
	import { dataSelected, isOpenDelete, isOpenEdit } from '../../stores.ts';
	import Eye from '@lucide/svelte/icons/eye';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';

	let { id, name }: { id: string; name: string } = $props();
</script>

<div class="flex justify-end gap-2">
	<Tooltip text="Detail product">
		{#snippet trigger()}
			<button
				onclick={() => {
					goto(resolve(`/product/${id}`));
				}}
			>
				<Eye class="w-4 cursor-pointer stroke-slate-700" />
			</button>
		{/snippet}
	</Tooltip>

	<Tooltip text="Edit product">
		{#snippet trigger()}
			<button
				onclick={() => {
					isOpenEdit.set(true);
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

	<Tooltip text="Delete product">
		{#snippet trigger()}
			<button
				onclick={() => {
					isOpenDelete.set(true);
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
