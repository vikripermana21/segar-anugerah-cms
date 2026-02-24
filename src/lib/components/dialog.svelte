<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	let { open = $bindable(false), children, title, description, ...restProps } = $props();

	function getOpen() {
		return open;
	}

	function setOpen(newOpen: boolean) {
		open = newOpen;
	}
</script>

<Dialog.Root bind:open={getOpen, setOpen} {...restProps}>
	<Dialog.Portal>
		<Dialog.Overlay />
		<Dialog.Content>
			<Dialog.Title>
				{@render title()}
			</Dialog.Title>
			<Dialog.Description>
				{@render description()}
			</Dialog.Description>
			{@render children?.()}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
