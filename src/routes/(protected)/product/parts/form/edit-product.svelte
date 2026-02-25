<script lang="ts">
	import InputForm from '@/components/input-form.svelte';
	import SelectForm from '@/components/select-form.svelte';
	import FileInputForm from '@/components/file-input-form.svelte';
	import { Button } from '@/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { yup as yupResolver } from 'sveltekit-superforms/adapters';
	import { queryClient } from '../../../../../config/client.js';
	import { PRODUCT_DEFAULT_VALUE, PRODUCT_QUERY_KEY, PRODUCT_SCHEMA } from '../../constants.js';
	import { useEditProduct, useProductDetail } from '../../services.js';
	import { dataSelected, isOpenEdit } from '../../stores.ts';
	import { useProductCategoryQuery } from '../../../product-category/services.js';
	import X from '@lucide/svelte/icons/x';

	let result = useProductDetail($dataSelected.id);
	let patch = useEditProduct($dataSelected.id);
	const categoryQuery = useProductCategoryQuery({});
	let removeExistingImage = $state(false);

	const categoryOptions = $derived(
		($categoryQuery.data?.data ?? []).map((category: { id: string; name: string }) => ({
			id: category.id,
			name: category.name
		}))
	);

	const existingImageUrl = $derived($result.data?.data?.product_image ?? '');

	const { form, errors, constraints, enhance, reset } = superForm(PRODUCT_DEFAULT_VALUE, {
		SPA: true,
		validators: yupResolver(PRODUCT_SCHEMA),
		onUpdate({ form }) {
			if (form.valid) {
				const formData = new FormData();
				formData.append('name', form.data.name);
				formData.append('description', form.data.description);
				formData.append('category_id', form.data.category_id);

				if (form.data.product_image) {
					formData.append('product_image', form.data.product_image);
				}

				if (removeExistingImage) {
					formData.append('remove_existing_image', 'true');
				}

				$patch.mutate(formData, {
					onSuccess: () => {
						isOpenEdit.set(false);
						toast.success('Product has been edited successfully!');
						queryClient.invalidateQueries(PRODUCT_QUERY_KEY);
					}
				});
			}
		}
	});

	$effect(() => {
		if ($result.isFetching) return;
		removeExistingImage = false;
		reset({
			data: {
				name: $result.data.data.name,
				description: $result.data.data.description,
				category_id: $result.data.data.category_id,
				product_image: null,
				existing_image_url: $result.data.data.product_image ?? ''
			}
		});
	});
</script>

<form class="flex h-full flex-col justify-between" method="POST" use:enhance>
	<div class="flex flex-col gap-2">
		{#if existingImageUrl && !removeExistingImage}
			<div class="flex flex-col gap-2 text-sm">
				<div class="relative w-full">
					<img src={existingImageUrl} alt="Product Image" class="w-full rounded-md object-cover" />
					<button
						type="button"
						onclick={() => (removeExistingImage = true)}
						class="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm hover:bg-destructive/90"
					>
						<X class="h-4 w-4" />
					</button>
				</div>
			</div>
		{:else}
			<FileInputForm
				bind:value={$form.product_image}
				label="Product Image"
				accept="image/*"
				errors={$errors.product_image}
				constraints={$constraints.product_image}
			/>
		{/if}

		<InputForm
			bind:value={$form.name}
			label="Product Name"
			placeholder="Ikan Kerapu 100gr"
			constraints={$constraints.name}
			errors={$errors.name}
		/>
		<InputForm
			bind:value={$form.description}
			label="Description"
			placeholder="This products is ...."
			constraints={$constraints.description}
			errors={$errors.description}
		/>
		<SelectForm
			bind:value={$form.category_id}
			label="Category"
			placeholder="Select a category"
			options={categoryOptions}
			errors={$errors.category_id}
		/>
	</div>
	<div class="flex w-full border-t pt-4">
		<Button type="submit" class="w-full">Submit</Button>
	</div>
</form>
