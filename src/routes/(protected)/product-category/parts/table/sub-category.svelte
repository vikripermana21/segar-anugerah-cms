<script lang="ts">
	import { dataSelected, isOpenEditSub } from '../../stores.ts';

	let { children }: { children: { id: string; name: string }[] } = $props();
</script>

{#if children.length > 0}
	<div class="flex gap-2">
		{#each children as child (child.id)}
			<button
				class="flex cursor-pointer items-center gap-2 bg-slate-200 p-1 text-xs transition-all hover:scale-105"
				onclick={() => {
					isOpenEditSub.set(true);
					dataSelected.set({
						id: child.id,
						name: child.name
					});
				}}
			>
				<p>{child.name}</p>
			</button>
		{/each}
	</div>
{:else}
	<div class="text-xs">-</div>
{/if}
