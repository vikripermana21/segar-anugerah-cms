<script lang="ts">
	import DataTable from '@/components/data-table.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import Plus from '@lucide/svelte/icons/plus';
	import { columns } from './column.ts';
	import { isOpenCreate } from './stores.ts';
	import { useProductCategoryQuery } from './services.ts';
	import Modals from './modals.svelte';
	import DebouncedInput from '@/components/debounced-input.svelte';

	let search = $state('');

	const queryResult = $derived.by(() => useProductCategoryQuery({ search }));
</script>

<Modals />

<div class="flex flex-col gap-5">
	<div class="flex justify-between gap-5">
		<DebouncedInput bind:debouncedValue={search} placeholder="Search by name" />
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
