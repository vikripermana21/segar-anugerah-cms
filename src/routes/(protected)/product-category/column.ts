export const columns = [
	{
		accessorKey: 'name',
		header: 'Category Name'
	},
	{
		accessorKey: 'description',
		header: 'Description'
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
