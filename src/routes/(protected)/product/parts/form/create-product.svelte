<script lang="ts">
	import InputForm from '@/components/input-form.svelte';
	import SelectForm from '@/components/select-form.svelte';
	import FileInputForm from '@/components/file-input-form.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { useCreateProduct } from '../../services.js';
	import { PRODUCT_DEFAULT_VALUE, PRODUCT_QUERY_KEY, PRODUCT_SCHEMA } from '../../constants.js';
	import { queryClient } from '../../../../../config/client.js';
	import { toast } from 'svelte-sonner';
	import { yup as yupResolver } from 'sveltekit-superforms/adapters';
	import { Button } from '@/components/ui/button/index.js';
	import { isOpenCreate } from '../../stores.ts';
	import { useProductCategoryQuery } from '../../../product-category/services.js';

	let post = useCreateProduct();
	const categoryQuery = useProductCategoryQuery({});

	const categoryOptions = $derived(
		($categoryQuery.data?.data ?? []).map((category: { id: string; name: string }) => ({
			id: category.id,
			name: category.name
		}))
	);

	const { form, errors, constraints, enhance } = superForm(PRODUCT_DEFAULT_VALUE, {
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

				$post.mutate(formData, {
					onSuccess: () => {
						isOpenCreate.set(false);
						toast.success('Product has been added successfully!');
						queryClient.invalidateQueries(PRODUCT_QUERY_KEY);
					}
				});
			}
		}
	});
</script>

<form class="flex h-full flex-col justify-between" method="POST" use:enhance>
	<div class="flex flex-col gap-2">
		<FileInputForm
			bind:value={$form.product_image}
			label="Product Image"
			accept="image/*"
			errors={$errors.product_image}
			constraints={$constraints.product_image}
		/>
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
