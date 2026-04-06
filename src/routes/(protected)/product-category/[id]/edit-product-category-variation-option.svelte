<script lang="ts">
	import InputForm from '@/components/input-form.svelte';
	import { Button } from '@/components/ui/button/index.js';
	import Trash from '@lucide/svelte/icons/trash';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { yup as yupResolver } from 'sveltekit-superforms/adapters';
	import { useEditProductVariationOption, useProductVariationOptionDetail } from '../services.ts';
	import {
		dataSelected,
		isOpenDeleteProductCategoryVariationOption,
		isOpenEditProductCategoryVariationOption
	} from '../stores.ts';
	import { PRODUCT_CATEGORY_DEFAULT_VALUE, PRODUCT_CATEGORY_SCHEMA } from '../constants.ts';
	import { queryClient } from '../../../../config/client.ts';

	let result = useProductVariationOptionDetail($dataSelected.id);
	let patch = useEditProductVariationOption($dataSelected.id);

	const { form, errors, constraints, enhance, reset } = superForm(PRODUCT_CATEGORY_DEFAULT_VALUE, {
		SPA: true,
		validators: yupResolver(PRODUCT_CATEGORY_SCHEMA),
		onUpdate({ form }) {
			if (form.valid) {
				$patch.mutate(form.data, {
					onSuccess: () => {
						isOpenEditProductCategoryVariationOption.set(false);
						toast.success('Product category has been edited successfully!');
						queryClient.invalidateQueries();
					}
				});
			}
		}
	});

	$effect(() => {
		if ($result.isFetching) return;
		reset({
			data: {
				name: $result.data.data.value
			}
		});
	});
</script>

<form class="flex h-full flex-col justify-between" method="POST" use:enhance>
	<InputForm
		bind:value={$form.name}
		label="Option Value"
		placeholder="100g, XL, Red"
		constraints={$constraints.name}
		errors={$errors.name}
	/>
	<div class="flex w-full gap-4 border-t pt-4">
		<Button
			onclick={() => {
				isOpenDeleteProductCategoryVariationOption.set(true);
				dataSelected.set({
					id: $result.data.data.id,
					name: $result.data.data.value
				});
			}}
			variant="destructive"
		>
			<Trash />
		</Button>
		<Button type="submit" class="w-full flex-1">Submit</Button>
	</div>
</form>
