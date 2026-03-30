<script lang="ts">
	import Tooltip from '@/components/tooltip.svelte';
	import Link from '@lucide/svelte/icons/link';
	import Trash from '@lucide/svelte/icons/trash';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Eye from '@lucide/svelte/icons/eye';
	import { dataSelected, isOpenCreateSub, isOpenDelete, isOpenEdit } from '../../stores.ts';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { id, name }: { id: string; name: string } = $props();
</script>

<div class="flex justify-end gap-2">
	<Tooltip text="Detail">
		{#snippet trigger()}
			<button
				onclick={() => {
					goto(resolve(`/product-category/${id}`));
				}}
			>
				<Eye class="w-4 cursor-pointer stroke-slate-700" />
			</button>
		{/snippet}
	</Tooltip>

	<Tooltip text="Edit category">
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

	<Tooltip text="Add a sub category">
		{#snippet trigger()}
			<button
				onclick={() => {
					isOpenCreateSub.set(true);
					dataSelected.set({
						id,
						name
					});
				}}
			>
				<Link class="w-4 cursor-pointer stroke-blue-700" />
			</button>
		{/snippet}
	</Tooltip>
	<Tooltip text="Delete category">
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
