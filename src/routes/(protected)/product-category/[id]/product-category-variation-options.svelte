<script lang="ts">
	import { Separator } from '@/components/ui/separator/index.js';

	let {
		options
	}: {
		options: Array<{ id: string; value: string; variation_id: string }>;
	} = $props();
</script>

<div class="flex gap-3">
	{#each options as option, i (option.id)}
		<div class="flex gap-2">
			<p class="text-muted-foreground">{option.value}</p>
			{#if i + 1 !== options.length}
				<Separator orientation="vertical" />
			{/if}
		</div>
	{:else}
		<p class="text-muted-foreground">-</p>
	{/each}
</div>
