<script>
	import InputForm from '@/components/input-form.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { queryClient } from '../../../../config/client.ts';
	import { PRODUCT_CATEGORY_VARIATION_OPTION_SCHEMA } from '../constants.ts';
	import { useCreateProductVariationOption } from '../services.ts';
	import { dataSelected, isOpenCreateProductCategoryVariationOption } from '../stores.ts';
	import { yup as yupResolver } from 'sveltekit-superforms/adapters';

	let post = useCreateProductVariationOption();

	const { form, errors, constraints, enhance } = superForm(
		{
			name: ''
		},
		{
			SPA: true,
			validators: yupResolver(PRODUCT_CATEGORY_VARIATION_OPTION_SCHEMA),
			onUpdate({ form }) {
				if (form.valid) {
					$post.mutate(
						{
							variation_id: $dataSelected.id,
							value: form.data.name
						},
						{
							onSuccess: () => {
								isOpenCreateProductCategoryVariationOption.set(false);
								toast.success('Variation option has been added successfully!');
								queryClient.invalidateQueries();
							}
						}
					);
				}
			}
		}
	);
</script>

<form class="flex h-full flex-col justify-between" method="POST" use:enhance>
	<InputForm
		bind:value={$form.name}
		label="Option Value"
		placeholder="100g, XL, Red, ..."
		constraints={$constraints.name}
		errors={$errors.name}
	/>
	<div class="flex w-full border-t pt-4">
		<Button type="submit" class="w-full">Submit</Button>
	</div>
</form>
