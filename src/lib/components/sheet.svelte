<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	let { title, description, children, isOpen = $bindable(false) } = $props();
	function getOpen() {
		return isOpen;
	}

	function setOpen(newOpen: boolean) {
		isOpen = newOpen;
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
		<div class="px-4">
			{@render children()}
		</div>
	</Sheet.Content>
</Sheet.Root>
