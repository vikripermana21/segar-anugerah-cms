<script>
	import Dialog from '@/components/dialog.svelte';
	import { toast } from 'svelte-sonner';
	import { queryClient } from '../../../config/client.ts';
	import { PRODUCT_CATEGORY_QUERY_KEY } from './constants.ts';
	import { useDeleteProductCategory } from './services.ts';
	import {
		dataSelected,
		isOpenCreate,
		isOpenCreateSub,
		isOpenDelete,
		isOpenDeleteSub,
		isOpenEdit
	} from './stores.ts';
	import Button from '@/components/ui/button/button.svelte';
	import Sheet from '@/components/sheet.svelte';
	import CreateProductCategory from './parts/form/create-product-category.svelte';
	import CreateSubProductCategory from './parts/form/create-sub-product-category.svelte';
	import EditProductCategory from './parts/form/edit-product-category.svelte';
	import EditSubProductCategory from './parts/form/edit-sub-product-category.svelte';

	const deleteCategory = useDeleteProductCategory();

	const handleDelete = () => {
		$deleteCategory.mutate($dataSelected.id, {
			onSuccess: () => {
				toast.success('Category has been deleted!');
				isOpenDelete.set(false);
				isOpenDeleteSub.set(false);
				queryClient.invalidateQueries(PRODUCT_CATEGORY_QUERY_KEY);
			}
		});
	};
</script>

<Dialog bind:open={$isOpenDelete}>
	{#snippet title()}
		Delete Category
	{/snippet}

	{#snippet description()}
		Are you sure to delete <b>`{$dataSelected.name}`</b>?. <br /> Deleting the parent means you will lose
		all of it`s children
	{/snippet}

	<div class="flex w-full">
		<Button class="w-full" variant="destructive" onclick={handleDelete}>Delete</Button>
	</div>
</Dialog>

<Dialog bind:open={$isOpenDeleteSub}>
	{#snippet title()}
		Delete Category
	{/snippet}

	{#snippet description()}
		Are you sure to delete <b>`{$dataSelected.name}`</b>?. <br /> Deleting the parent means you will lose
		all of it`s children
	{/snippet}

	<div class="flex w-full">
		<Button class="w-full" variant="destructive" onclick={handleDelete}>Delete</Button>
	</div>
</Dialog>

<Sheet bind:open={$isOpenCreate}>
	{#snippet title()}
		Create Product Category
	{/snippet}

	{#snippet description()}
		Add product category
	{/snippet}

	<CreateProductCategory />
</Sheet>

<Sheet bind:open={$isOpenCreateSub}>
	{#snippet title()}
		Create Sub Product Category
	{/snippet}

	{#snippet description()}
		Add sub product category
	{/snippet}

	<CreateSubProductCategory />
</Sheet>

<Sheet bind:open={$isOpenEdit}>
	{#snippet title()}
		Edit Product Category
	{/snippet}

	{#snippet description()}
		Edit product category
	{/snippet}

	<EditProductCategory />
</Sheet>
