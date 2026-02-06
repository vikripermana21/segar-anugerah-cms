<script lang="ts">
	import DataTable from '@/components/data-table.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import api from '@/http/axios.js';
	import Plus from '@lucide/svelte/icons/plus';
	import { columns } from './column.ts';
	import Sheet from '@/components/sheet.svelte';

	let data = $state([]);
	let isOpen = $state(false);

	api.get('/product-category').then((res) => (data = res.data.data));
</script>

<Sheet bind:isOpen>
	{#snippet title()}
		Create Product Category
	{/snippet}

	{#snippet description()}
		Description
	{/snippet}

	<div>hello</div>
</Sheet>

<div class="flex flex-col gap-5">
	<div class="flex justify-between gap-5">
		<Input />
		<Button class="w-fit" onclick={() => (isOpen = true)}>
			<Plus />
			<p>Create Product Category</p>
		</Button>
	</div>
	<DataTable {data} {columns} />
</div>
