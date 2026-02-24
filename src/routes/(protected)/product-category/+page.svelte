<script lang="ts">
	import DataTable from '@/components/data-table.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import Plus from '@lucide/svelte/icons/plus';
	import { columns } from './column.ts';
	import { isOpenCreate } from './stores.ts';
	import { useProductCategoryQuery } from './services.ts';
	import Modals from './modals.svelte';

	let search = $state('');
	let debouncedSearch = $state('');

	$effect(() => {
		const rtSearch = search;
		const debounce = setTimeout(() => {
			debouncedSearch = rtSearch;
		}, 500);

		return () => clearTimeout(debounce);
	});
	const queryResult = $derived.by(() => useProductCategoryQuery({ search: debouncedSearch }));
</script>

<Modals />

<div class="flex flex-col gap-5">
	<div class="flex justify-between gap-5">
		<Input bind:value={search} />
		<Button class="w-fit" onclick={() => isOpenCreate.set(true)}>
			<Plus />
			<p>Create Product Category</p>
		</Button>
	</div>
	{#if $queryResult.isFetching}
		<div class="flex w-full items-center justify-center">
			<LoaderCircle class="animate-spin" />
		</div>
	{:else}
		<DataTable data={$queryResult?.data?.data} {columns} />
	{/if}
</div>
