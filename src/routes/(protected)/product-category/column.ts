import { renderComponent } from '@/components/ui/data-table/render-helpers.js';
import SubCategory from './parts/table/sub-category.svelte';
import Actions from './parts/table/actions.svelte';

export const columns = [
	{
		accessorKey: 'name',
		header: 'Category Name'
	},
	{
		accessorKey: 'children',
		header: 'Sub Category',
		cell: ({ row }) => {
			return renderComponent(SubCategory, { children: row.original.children });
		}
	},
	{
		id: 'actions',
		header: '',
		cell: ({ row }) => {
			return renderComponent(Actions, { id: row.original.id, name: row.original.name });
		}
	}

	// {
	// 	id: 'actions',
	// 	header: () => {
	// 		const actionHeaderSnippet = createRawSnippet(() => ({
	// 			render: () => `<div class="text-end">Action</div>`
	// 		}));
	// 		return renderSnippet(actionHeaderSnippet);
	// 	},
	// 	cell: ({ row }) => {
	// 		// You can pass whatever you need from `row.original` to the component
	// 		return renderComponent(DataTableActions, { id: row.original.id });
	// 	}
	// }
];
