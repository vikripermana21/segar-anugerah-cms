<script lang="ts">
	import Input from './ui/input/input.svelte';

	let {
		label,
		placeholder = 'Insert an image',
		constraints,
		errors,
		value = $bindable(),
		accept
	} = $props();

	const fileName = $derived(value?.name ?? '');

	function handleFileSelect(file: File | null) {
		if (file) {
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);
			return dataTransfer.files;
		}
		return undefined;
	}
</script>

<div>
	<label class="flex flex-col gap-2 text-sm">
		<p>{label}</p>
		<Input
			type="file"
			aria-invalid={errors ? 'true' : undefined}
			{accept}
			{placeholder}
			{...constraints}
			files={handleFileSelect(value)}
			onchange={(e: Event) => {
				const target = e.target as HTMLInputElement;
				value = target.files?.[0] ?? null;
			}}
		/>
		{#if errors}<span class="text-xs text-red-500">{errors}</span>{/if}
	</label>
</div>
