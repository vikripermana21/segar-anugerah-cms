<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { type Snippet } from 'svelte';

	let { text, trigger }: { text: string; trigger: Snippet } = $props();
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		{@render trigger()}
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p>{text}</p>
	</Tooltip.Content>
</Tooltip.Root>
