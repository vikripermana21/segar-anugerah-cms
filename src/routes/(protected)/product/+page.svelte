<script lang="ts">
	import DataTable from '@/components/data-table.svelte';
	import { columns } from './column.ts';
</script>

<div>
	<DataTable
		data={[
			{
				id: '728ed52f',
				amount: 100,
				status: 'pending',
				email: 'm@example.com'
			},
			{
				id: '489e1d42',
				amount: 125,
				status: 'processing',
				email: 'example@gmail.com'
			}
		]}
		{columns}
	/>
</div>
