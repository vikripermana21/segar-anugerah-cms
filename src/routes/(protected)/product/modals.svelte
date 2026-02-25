<script>
	import Dialog from '@/components/dialog.svelte';
	import { toast } from 'svelte-sonner';
	import { queryClient } from '../../../config/client.ts';
	import { PRODUCT_QUERY_KEY } from './constants.ts';
	import { useDeleteProduct } from './services.ts';
	import { dataSelected, isOpenCreate, isOpenDelete, isOpenEdit } from './stores.ts';
	import Button from '@/components/ui/button/button.svelte';
	import Sheet from '@/components/sheet.svelte';
	import CreateProduct from './parts/form/create-product.svelte';
	import EditProduct from './parts/form/edit-product.svelte';

	const deleteProduct = useDeleteProduct();

	const handleDelete = () => {
		$deleteProduct.mutate($dataSelected.id, {
			onSuccess: () => {
				toast.success('Product has been deleted!');
				isOpenDelete.set(false);
				queryClient.invalidateQueries(PRODUCT_QUERY_KEY);
			}
		});
	};
</script>

<Dialog bind:open={$isOpenDelete}>
	{#snippet title()}
		Delete Product
	{/snippet}

	{#snippet description()}
		Are you sure to delete <b>`{$dataSelected.name}`</b>?
	{/snippet}

	<div class="flex w-full">
		<Button class="w-full" variant="destructive" onclick={handleDelete}>Delete</Button>
	</div>
</Dialog>

<Sheet bind:open={$isOpenCreate}>
	{#snippet title()}
		Create Product
	{/snippet}

	{#snippet description()}
		Add product
	{/snippet}

	<CreateProduct />
</Sheet>

<Sheet bind:open={$isOpenEdit}>
	{#snippet title()}
		Edit Product
	{/snippet}

	{#snippet description()}
		Edit product
	{/snippet}

	<EditProduct />
</Sheet>
