<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { cn } from '$lib/utils.js';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';

	let {
		items
	}: {
		items: {
			title: string;
			url?: string;
			// this should be `Component` after @lucide/svelte updates types
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			icon?: any;
			isActive?: boolean;
			items?: {
				title: string;
				url: string;
			}[];
		}[];
	} = $props();
</script>

<Sidebar.Group>
	<Sidebar.Menu>
		{#each items as item (item.title)}
			<Collapsible.Root
				open={item.isActive || page.url.pathname.includes(item.url as string)}
				class="group/collapsible"
			>
				{#snippet child({ props })}
					<Sidebar.MenuItem {...props}>
						<Collapsible.Trigger>
							{#snippet child({ props })}
								{#if !item.items}
									<Sidebar.MenuButton
										{...props}
										class={cn([
											{
												'bg-primary text-secondary hover:bg-primary/90 hover:text-secondary':
													page.url.pathname.includes(item.url as string)
											}
										])}
										onclick={() => goto(item?.url || '')}
										tooltipContent={item.title}
									>
										{#if item.icon}
											<item.icon />
										{/if}
										<span>{item.title}</span>
									</Sidebar.MenuButton>
								{:else}
									<Sidebar.MenuButton
										{...props}
										class={cn([
											{
												'bg-primary text-secondary hover:bg-primary/90 hover:text-secondary':
													page.url.pathname.includes(item.url as string)
											}
										])}
										tooltipContent={item.title}
									>
										{#if item.icon}
											<item.icon />
										{/if}
										<span>{item.title}</span>
										<ChevronRightIcon
											class="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
										/>
									</Sidebar.MenuButton>
								{/if}
							{/snippet}
						</Collapsible.Trigger>

						{#if !!item.items}
							<Collapsible.Content>
								<Sidebar.MenuSub
									class={cn([{ 'border-primary': page.url.pathname.includes(item.url as string) }])}
								>
									{#each item.items ?? [] as subItem (subItem.title)}
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton
												class={cn([
													{
														'font-bold text-primary!':
															page.url.pathname === subItem.url ||
															page.url.pathname.startsWith(`${subItem.url}/`)
													}
												])}
											>
												{#snippet child({ props })}
													<a href={subItem.url} {...props}>
														<span>{subItem.title}</span>
													</a>
												{/snippet}
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									{/each}
								</Sidebar.MenuSub>
							</Collapsible.Content>
						{/if}
					</Sidebar.MenuItem>
				{/snippet}
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
