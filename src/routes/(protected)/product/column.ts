import DataTableActions from '@/components/data-table-actions.svelte';
import { renderComponent, renderSnippet } from '@/components/ui/data-table/render-helpers.js';
import { createRawSnippet } from 'svelte';

export const columns = [
	{
		accessorKey: 'status',
		header: 'Status'
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		cell: ({ row }) => {
			const formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD'
			});

			const amountCellSnippet = createRawSnippet<[{ amount: number }]>((getAmount) => {
				const { amount } = getAmount();
				const formatted = formatter.format(amount);
				return {
					render: () => `<div class="font-medium">${formatted}</div>`
				};
			});

			return renderSnippet(amountCellSnippet, {
				amount: row.original.amount
			});
		}
	},
	{
		id: 'actions',
		header: () => {
			const actionHeaderSnippet = createRawSnippet(() => ({
				render: () => `<div class="text-end">Action</div>`
			}));
			return renderSnippet(actionHeaderSnippet);
		},
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableActions, { id: row.original.id });
		}
	}
];
