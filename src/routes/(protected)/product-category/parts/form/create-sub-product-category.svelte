<script lang="ts">
	import InputForm from '@/components/input-form.svelte';
	import { Button } from '@/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { yup as yupResolver } from 'sveltekit-superforms/adapters';
	import { queryClient } from '../../../../../config/client.js';
	import {
		PRODUCT_CATEGORY_DEFAULT_VALUE,
		PRODUCT_CATEGORY_QUERY_KEY,
		PRODUCT_CATEGORY_SCHEMA
	} from '../../constants.js';
	import { useCreateProductCategory } from '../../services.js';
	import { dataSelected, isOpenCreateSub } from '../../stores.ts';

	let post = useCreateProductCategory();

	const { form, errors, constraints, enhance } = superForm(PRODUCT_CATEGORY_DEFAULT_VALUE, {
		SPA: true,
		validators: yupResolver(PRODUCT_CATEGORY_SCHEMA),
		onUpdate({ form }) {
			if (form.valid) {
				$post.mutate(
					{ name: form.data.name, parent_category_id: $dataSelected.id },
					{
						onSuccess: () => {
							isOpenCreateSub.set(false);
							toast.success('Sub product category has been added successfully!');
							queryClient.invalidateQueries(PRODUCT_CATEGORY_QUERY_KEY);
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
		label="Category Name"
		placeholder="Ikan, Udang, dsb.."
		constraints={$constraints.name}
		errors={$errors.name}
	/>
	<div class="flex w-full border-t pt-4">
		<Button type="submit" class="w-full">Submit</Button>
	</div>
</form>
