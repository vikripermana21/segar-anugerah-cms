<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import DataTable from '@/components/data-table.svelte';
	import DebouncedInput from '@/components/debounced-input.svelte';
	import Sheet from '@/components/sheet.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { renderComponent } from '@/components/ui/data-table/render-helpers.js';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import Plus from '@lucide/svelte/icons/plus';
	import { useProductCategoryDetail, useProductCategoryVariation } from '../services.ts';
	import {
		isOpenCreateProductCategoryVariation,
		isOpenCreateProductCategoryVariationOption
	} from '../stores.ts';
	import CreateProductCategoryVariation from './create-product-category-variation.svelte';
	import ProductCategoryVariationActions from './product-category-variation-actions.svelte';
	import ProductCategoryVariationOptions from './product-category-variation-options.svelte';

	const id = $derived(page.params.id || '');
	let search = $state('');

	const queryResult = useProductCategoryDetail(id);
	const variationQuery = $derived(useProductCategoryVariation(id, { search }));
	const handleBack = () => {
		goto(resolve('/product-category'));
	};

	// Columns for variations table
	const variationColumns = [
		{
			accessorKey: 'name',
			header: 'Variation'
		},
		{
			accessorKey: 'option',
			header: 'Options',
			cell: ({ row }) => {
				return renderComponent(ProductCategoryVariationOptions, {
					options: row.original.options
				});
			}
		},
		{
			id: 'actions',
			header: '',
			cell: ({ row }) => {
				return renderComponent(ProductCategoryVariationActions, {
					id: row.original.id,
					name: row.original.name
				});
			}
		}
	];

	const handleCreate = () => {
		isOpenCreateProductCategoryVariation.set(true);
	};
</script>

<Sheet bind:open={$isOpenCreateProductCategoryVariation}>
	{#snippet title()}
		Create Product Category
	{/snippet}

	{#snippet description()}
		Add product category
	{/snippet}

	<CreateProductCategoryVariation />
</Sheet>

<Sheet bind:open={$isOpenCreateProductCategoryVariationOption}>
	{#snippet title()}
		Create Product Category Variation Option
	{/snippet}

	{#snippet description()}
		Add product category variation option
	{/snippet}

	<div>Mantap</div>
</Sheet>

<div class="flex flex-col gap-5">
	<div class="flex items-center gap-2">
		<button onclick={handleBack} class="hover:opacity-70">
			<ArrowLeft class="w-5" />
		</button>
		<h1 class="text-2xl font-bold">Product Category Detail</h1>
	</div>

	{#if $queryResult.isFetching}
		<div class="flex w-full items-center justify-center">
			<LoaderCircle class="animate-spin" />
		</div>
	{:else if $queryResult.error}
		<div class="flex w-full items-center justify-center text-destructive">
			<p>Failed to load product category details</p>
		</div>
	{:else if $queryResult.data}
		<div class="grid grid-cols-2 gap-4 rounded-lg bg-card p-6">
			<div class="grid gap-2">
				<div class="text-sm text-muted-foreground">Category Name</div>
				<div class="text-lg font-semibold">{$queryResult.data?.data?.name}</div>
			</div>
			<div class="grid gap-2">
				<div class="text-sm text-muted-foreground">Sub Category</div>
				<div class="flex gap-4">
					{#each $queryResult.data?.data?.children as child (child.id)}
						<div class="flex items-center gap-2 bg-slate-200 p-1 text-xs">
							<p>{child?.name}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
	<div class="flex flex-col gap-5">
		<div class="flex justify-between gap-5">
			<DebouncedInput bind:debouncedValue={search} placeholder="Search variation" />
			<Button class="w-fit" onclick={handleCreate}>
				<Plus />
				<p>Create Variation</p>
			</Button>
		</div>

		{#if $variationQuery.data}
			<DataTable data={$variationQuery?.data?.data} columns={variationColumns} />
		{/if}
	</div>
</div>
