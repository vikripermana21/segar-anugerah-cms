<script lang="ts">
	import InputForm from '@/components/input-form.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { useCreateProductCategory } from '../../services.js';
	import {
		PRODUCT_CATEGORY_DEFAULT_VALUE,
		PRODUCT_CATEGORY_QUERY_KEY,
		PRODUCT_CATEGORY_SCHEMA
	} from '../../constants.js';
	import { queryClient } from '../../../../../config/client.js';
	import { toast } from 'svelte-sonner';
	import { yup as yupResolver } from 'sveltekit-superforms/adapters';
	import { Button } from '@/components/ui/button/index.js';
	import { isOpenCreate } from '../../stores.ts';

	let post = useCreateProductCategory();

	const { form, errors, constraints, enhance } = superForm(PRODUCT_CATEGORY_DEFAULT_VALUE, {
		SPA: true,
		validators: yupResolver(PRODUCT_CATEGORY_SCHEMA),
		onUpdate({ form }) {
			if (form.valid) {
				$post.mutate(form.data, {
					onSuccess: () => {
						isOpenCreate.set(false);
						toast.success('Product category has been added successfully!');
						queryClient.invalidateQueries(PRODUCT_CATEGORY_QUERY_KEY);
					}
				});
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

