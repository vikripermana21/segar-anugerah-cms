<script lang="ts">
	import InputForm from '@/components/input-form.svelte';
	import { Button } from '@/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { yup as yupResolver } from 'sveltekit-superforms/adapters';
	import { useEditProductVariation, useProductVariationDetail } from '../services.ts';
	import { dataSelected, isOpenEditProductCategoryVariation } from '../stores.ts';
	import { PRODUCT_CATEGORY_DEFAULT_VALUE, PRODUCT_CATEGORY_SCHEMA } from '../constants.ts';
	import { queryClient } from '../../../../config/client.ts';

	let result = useProductVariationDetail($dataSelected.id);
	let patch = useEditProductVariation($dataSelected.id);

	const { form, errors, constraints, enhance, reset } = superForm(PRODUCT_CATEGORY_DEFAULT_VALUE, {
		SPA: true,
		validators: yupResolver(PRODUCT_CATEGORY_SCHEMA),
		onUpdate({ form }) {
			if (form.valid) {
				$patch.mutate(form.data, {
					onSuccess: () => {
						isOpenEditProductCategoryVariation.set(false);
						toast.success('Product variation has been edited successfully!');
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
				name: $result.data.data.name
			}
		});
	});
</script>

<form class="flex h-full flex-col justify-between" method="POST" use:enhance>
	<div class="flex flex-col gap-6">
		<InputForm
			bind:value={$form.name}
			label="Variation Name"
			placeholder="Weight, Color, etc..."
			constraints={$constraints.name}
			errors={$errors.name}
		/>
	</div>
	<div class="flex w-full border-t pt-4">
		<Button type="submit" class="w-full">Submit</Button>
	</div>
</form>
