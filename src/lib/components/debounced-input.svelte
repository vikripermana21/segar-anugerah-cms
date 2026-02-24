<script lang="ts">
	import { debounce } from '@/utils.js';
	import Input from './ui/input/input.svelte';

	let { debouncedValue = $bindable(), initialValue = '', ...props } = $props();

	const update = debounce((v: string) => (debouncedValue = v), 300);

	let value = $state(initialValue);
	$effect(() => update(value));
</script>

<Input bind:value {...props} />
