<script>
	import FileInputForm from '@/components/file-input-form.svelte';
	import InputForm from '@/components/input-form.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { PRODUCT_VARIATION_DEFAULT_VALUE } from '../constants.ts';

	// const id = $derived(page.params.id || '');
	// let post = useCreateProductVariation(id);

	const { form, errors, constraints, enhance } = superForm(PRODUCT_VARIATION_DEFAULT_VALUE, {
		SPA: true,
		// validators: yupResolver(PRODUCT_VARIATION_SCHEMA),
		onUpdate({ form }) {
			if (form.valid) {
				console.log(form);
				// $post.mutate(
				// 	{
				// 		category_id: id,
				// 		...form.data
				// 	},
				// 	{
				// 		onSuccess: () => {
				// 			isOpenCreateProductVariation.set(false);
				// 			toast.success('Product variation has been added successfully!');
				// 			queryClient.invalidateQueries('product');
				// 		}
				// 	}
				// );
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
			label="Variation Name"
			placeholder="Weight, Color, dsb.."
			constraints={$constraints.name}
			errors={$errors.name}
		/>
		<InputForm
			bind:value={$form.price}
			label="Price per unit"
			placeholder="1000000"
			constraints={$constraints.price}
			errors={$errors.price}
			type="number"
		/>
	</div>
	<div class="flex w-full border-t pt-4">
		<Button type="submit" class="w-full">Submit</Button>
	</div>
</form>
