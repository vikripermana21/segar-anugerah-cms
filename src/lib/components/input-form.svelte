<script>
	import Input from './ui/input/input.svelte';
	import Textarea from './ui/textarea/textarea.svelte';

	let {
		label,
		placeholder,
		constraints,
		errors,
		value = $bindable(),
		textArea = false,
		type = 'text'
	} = $props();
</script>

<div>
	<label class="flex flex-col gap-2 text-sm">
		<p>{label}</p>
		{#if textArea}
			<Textarea
				aria-invalid={errors ? 'true' : undefined}
				bind:value
				{...constraints}
				{placeholder}
			/>
		{:else}
			<Input
				aria-invalid={errors ? 'true' : undefined}
				bind:value
				{...constraints}
				{placeholder}
				{type}
			/>
		{/if}
		{#if errors}<span class="text-xs text-red-500">{errors}</span>{/if}
	</label>
</div>
