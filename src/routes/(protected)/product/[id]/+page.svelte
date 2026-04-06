<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import { useProductDetail, useProductVariationList } from '../services.ts';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import DebouncedInput from '@/components/debounced-input.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import Plus from '@lucide/svelte/icons/plus';
	import DataTable from '@/components/data-table.svelte';
	import ProductVariationActions from './product-variation-actions.svelte';
	import { renderComponent, renderSnippet } from '@/components/ui/data-table/render-helpers.js';
	import Sheet from '@/components/sheet.svelte';
	import { isOpenCreateProductVariation } from '../stores.ts';
	import CreateProductVariation from './create-product-variation.svelte';
	import { createRawSnippet } from 'svelte';
	import type { ColumnDef } from '@tanstack/table-core';

	const id = $derived(page.params.id || '');
	let search = $state('');

	const queryResult = $derived(useProductDetail(id));
	const variationQuery = $derived(useProductVariationList(id, { search }));

	$effect(() => {
		console.log($queryResult);
	});

	// Columns for variations table
	const variationColumns: ColumnDef<{ id: string; name: string; product_image: string }>[] = [
		{
			accessorKey: 'product_image',
			header: 'Image',
			cell: ({ row }) => {
				const imageSnippet = createRawSnippet<[{ image: string }]>((getImage) => {
					const { image } = getImage();
					return {
						render: () => `<img src="${image}" class="h-20 w-20 rounded-md" />`
					};
				});
				return renderSnippet(imageSnippet, {
					image: row.original.product_image
				});
			}
		},
		{
			accessorKey: 'sku',
			header: 'SKU'
		},
		{
			accessorKey: 'price',
			header: 'Price'
		},
		{
			accessorKey: 'qty',
			header: 'Qty'
		}

		// {
		// 	id: 'actions',
		// 	header: '',
		// 	cell: ({ row }) => {
		// 		return renderComponent(ProductVariationActions, {
		// 			id: row.original.id,
		// 			name: row.original.name
		// 		});
		// 	}
		// }
	];

	const handleBack = () => {
		goto(resolve('/product'));
	};

	const handleCreate = () => {
		isOpenCreateProductVariation.set(true);
	};
</script>

<Sheet bind:open={$isOpenCreateProductVariation}>
	{#snippet title()}
		Create Product Variation
	{/snippet}

	{#snippet description()}
		Add product variation
	{/snippet}

	<CreateProductVariation />
</Sheet>

<div class="flex flex-col gap-5">
	<div class="flex items-center gap-2">
		<button onclick={handleBack} class="hover:opacity-70">
			<ArrowLeft class="w-5" />
		</button>
		<h1 class="text-2xl font-bold">Product Detail</h1>
	</div>

	{#if $queryResult.isLoading}
		<div class="flex w-full items-center justify-center">
			<LoaderCircle class="animate-spin" />
		</div>
	{:else if $queryResult.error}
		<div class="flex w-full items-center justify-center text-destructive">
			<p>Failed to load product details</p>
		</div>
	{:else if $queryResult.data}
		<div class="grid grid-cols-3 gap-4 rounded-lg bg-card py-4">
			<div>
				<img src={$queryResult.data?.data?.product_image} alt="product" class="rounded-lg" />
			</div>
			<div class="col-span-2 flex flex-col gap-2">
				<div class="flex flex-col">
					<div class="text-sm text-muted-foreground">Product Name</div>
					<div class="text-lg font-semibold">{$queryResult.data?.data?.name}</div>
				</div>
				<div class="flex flex-col">
					<div class="text-sm text-muted-foreground">{$queryResult.data?.data?.description}</div>
				</div>
			</div>
		</div>
	{/if}
	<div class="flex flex-col gap-5">
		<div class="flex justify-between gap-5">
			<DebouncedInput bind:debouncedValue={search} placeholder="Search product variation" />
			<Button class="w-fit" onclick={handleCreate}>
				<Plus />
				<p>Create Product Variation</p>
			</Button>
		</div>

		{#if $variationQuery.data}
			<DataTable data={$variationQuery?.data?.data} columns={variationColumns} />
		{/if}
	</div>
</div>
