<script lang="ts">
	import Tooltip from '@/components/tooltip.svelte';
	import Link from '@lucide/svelte/icons/link';
	import Trash from '@lucide/svelte/icons/trash';
	import Pencil from '@lucide/svelte/icons/pencil';
	import { dataSelected, isOpenCreateSub, isOpenDelete, isOpenEdit } from '../../stores.ts';

	let { id, name }: { id: string; name: string } = $props();
</script>

<div class="flex justify-center gap-2">
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
