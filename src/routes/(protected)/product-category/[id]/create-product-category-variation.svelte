<script>
	import InputForm from '@/components/input-form.svelte';
	import { useCreateProductVariation } from '../services.ts';
	import { superForm } from 'sveltekit-superforms';
	import {
		PRODUCT_CATEGORY_VARIATION_DEFAULT_VALUE,
		PRODUCT_CATEGORY_VARIATION_QUERY_KEY,
		PRODUCT_CATEGORY_VARIATION_SCHEMA
	} from '../constants.ts';
	import { isOpenCreateProductCategoryVariation } from '../stores.ts';
	import { toast } from 'svelte-sonner';
	import { queryClient } from '../../../../config/client.ts';
	import Button from '@/components/ui/button/button.svelte';
	import { yup as yupResolver } from 'sveltekit-superforms/adapters';
	import { page } from '$app/state';

	const id = $derived(page.params.id || '');
	let post = useCreateProductVariation();

	const { form, errors, constraints, enhance } = superForm(PRODUCT_CATEGORY_VARIATION_DEFAULT_VALUE, {
		SPA: true,
		validators: yupResolver(PRODUCT_CATEGORY_VARIATION_SCHEMA),
		onUpdate({ form }) {
			if (form.valid) {
				$post.mutate(
					{
						category_id: id,
						...form.data
					},
					{
						onSuccess: () => {
							isOpenCreateProductCategoryVariation.set(false);
							toast.success('Product category has been added successfully!');
							queryClient.invalidateQueries(PRODUCT_CATEGORY_VARIATION_QUERY_KEY);
						}
					}
				);
			}
		}
	});
</script>

<form class="flex h-full flex-col justify-between" method="POST" use:enhance>
	<InputForm
		bind:value={$form.name}
		label="Variation Name"
		placeholder="Weight, Color, dsb.."
		constraints={$constraints.name}
		errors={$errors.name}
	/>
	<div class="flex w-full border-t pt-4">
		<Button type="submit" class="w-full">Submit</Button>
	</div>
</form>
