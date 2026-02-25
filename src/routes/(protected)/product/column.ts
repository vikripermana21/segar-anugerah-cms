import { renderComponent } from '@/components/ui/data-table/render-helpers.js';
import Actions from './parts/table/actions.svelte';

export const columns = [
	{
		accessorKey: 'name',
		header: 'Product Name'
	},
	{
		id: 'actions',
		header: '',
		cell: ({ row }) => {
			return renderComponent(Actions, { id: row.original.id, name: row.original.name });
		}
	}
];
