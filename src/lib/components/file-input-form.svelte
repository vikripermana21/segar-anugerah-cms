<script lang="ts">
	import Input from './ui/input/input.svelte';

	let {
		label,
		placeholder,
		constraints,
		errors,
		value = $bindable(),
		accept
	}: {
		label: string;
		placeholder?: string;
		constraints?: Record<string, unknown>;
		errors?: string[];
		value?: File | null;
		accept?: string;
	} = $props();

	const fileName = $derived(value?.name ?? '');
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
			files={value ? [value] : undefined}
			onchange={(e: Event) => {
				const target = e.target as HTMLInputElement;
				value = target.files?.[0] ?? null;
			}}
		/>
		{#if errors}<span class="text-xs text-red-500">{errors}</span>{/if}
	</label>
</div>
