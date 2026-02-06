<script lang="ts">
	import DataTable from '@/components/data-table.svelte';
	import { columns } from './column.ts';
	import api from '@/http/axios.js';
	import Button from '@/components/ui/button/button.svelte';
	import Plus from '@lucide/svelte/icons/plus';
	import Input from '@/components/ui/input/input.svelte';
	import Sheet from '@/components/sheet.svelte';

	let data = $state([]);
	let isOpen = $state(false);

	api.get('/product').then((res) => (data = res.data.data));
</script>

<Sheet bind:isOpen>
	{#snippet title()}
		Create Product
	{/snippet}

	{#snippet description()}
		Description
	{/snippet}

	<div>hello</div>
</Sheet>

<div class="flex flex-col gap-5">
	<div class="flex justify-between gap-5">
		<Input />
		<Button
			class="w-fit"
			onclick={() => {
				isOpen = true;
			}}
		>
			<Plus />
			<p>Create Product</p>
		</Button>
	</div>
	<DataTable {data} {columns} />
</div>
