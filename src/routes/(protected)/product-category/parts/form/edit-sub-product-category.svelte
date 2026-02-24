<script lang="ts">
	import InputForm from '@/components/input-form.svelte';
	import { Button } from '@/components/ui/button/index.js';
	import Trash from '@lucide/svelte/icons/trash';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { yup as yupResolver } from 'sveltekit-superforms/adapters';
	import { queryClient } from '../../../../../config/client.js';
	import {
		PRODUCT_CATEGORY_DEFAULT_VALUE,
		PRODUCT_CATEGORY_QUERY_KEY,
		PRODUCT_CATEGORY_SCHEMA
	} from '../../constants.js';
	import { useEditProductCategory, useProductCategoryDetail } from '../../services.js';
	import { dataSelected, isOpenDeleteSub, isOpenEditSub } from '../../stores.ts';

	let result = useProductCategoryDetail($dataSelected.id);
	let patch = useEditProductCategory($dataSelected.id);

	const { form, errors, constraints, enhance, reset } = superForm(PRODUCT_CATEGORY_DEFAULT_VALUE, {
		SPA: true,
		validators: yupResolver(PRODUCT_CATEGORY_SCHEMA),
		onUpdate({ form }) {
			if (form.valid) {
				$patch.mutate(form.data, {
					onSuccess: () => {
						isOpenEditSub.set(false);
						toast.success('Product category has been edited successfully!');
						queryClient.invalidateQueries(PRODUCT_CATEGORY_QUERY_KEY);
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
	<InputForm
		bind:value={$form.name}
		label="Category Name"
		placeholder="Ikan, Udang, dsb.."
		constraints={$constraints.name}
		errors={$errors.name}
	/>
	<div class="flex w-full gap-4 border-t pt-4">
		<Button
			onclick={() => {
				isOpenDeleteSub.set(true);
				dataSelected.set({
					id: $result.data.data.id,
					name: $result.data.data.name
				});
			}}
			variant="destructive"
		>
			<Trash />
		</Button>
		<Button type="submit" class="w-full flex-1">Submit</Button>
	</div>
</form>
