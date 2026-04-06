<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuItem
	} from '@/components/ui/dropdown-menu/index.js';
	import { Button } from '@/components/ui/button/index.js';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import Check from '@lucide/svelte/icons/check';

	interface Option {
		id: string;
		name: string;
	}

	let {
		label,
		placeholder = 'Select an option',
		options = [] as Option[],
		value = $bindable<string | null>(null),
		errors
	}: {
		label: string;
		placeholder?: string;
		options?: Option[];
		value?: string | null;
		errors?: string[];
	} = $props();

	const selectedLabel = $derived(options.find((opt) => opt.id === value)?.name ?? '');
</script>

<div>
	<label class="flex flex-col gap-2 text-sm">
		<p>{label}</p>
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="outline" class="w-full justify-between">
					<span class="truncate">{selectedLabel || placeholder}</span>
					<ChevronDown class="h-4 w-4 opacity-50" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="max-h-60 w-full overflow-y-auto">
				{#each options as option (option.id)}
					<DropdownMenuItem
						class="flex items-center justify-between"
						onclick={() => (value = option.id)}
					>
						<span class="truncate">{option.name}</span>
						{#if value === option.id}
							<Check class="h-4 w-4" />
						{/if}
					</DropdownMenuItem>
				{/each}
			</DropdownMenuContent>
		</DropdownMenu>
		{#if errors}<span class="text-xs text-red-500">{errors}</span>{/if}
	</label>
</div>
