<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	let { title, description, children, open = $bindable(false) } = $props();
	function getOpen() {
		return open;
	}

	function setOpen(newOpen: boolean) {
		open = newOpen;
	}
</script>

<Sheet.Root bind:open={getOpen, setOpen}>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>{@render title()}</Sheet.Title>
			<Sheet.Description>
				{@render description()}
			</Sheet.Description>
		</Sheet.Header>
		<div class="flex-1 px-4 pb-4">
			{@render children()}
		</div>
	</Sheet.Content>
</Sheet.Root>
