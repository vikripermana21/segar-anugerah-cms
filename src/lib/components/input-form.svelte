<script>
	import Input from './ui/input/input.svelte';

	let { label, placeholder, constraints, errors, value = $bindable() } = $props();
</script>

<div>
	<label class="flex flex-col gap-2 text-sm">
		<p>{label}</p>
		<Input aria-invalid={errors ? 'true' : undefined} bind:value {...constraints} {placeholder} />
		{#if errors}<span class="text-xs text-red-500">{errors}</span>{/if}
	</label>
</div>
