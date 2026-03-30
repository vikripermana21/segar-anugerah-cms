<script lang="ts" module>
	import BotIcon from '@lucide/svelte/icons/bot';
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import SquareTerminalIcon from '@lucide/svelte/icons/square-terminal';
	import Users from '@lucide/svelte/icons/users';

	// This is sample data.
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg'
		},
		teams: [
			{
				name: 'Segar Anugerah',
				logo: GalleryVerticalEndIcon,
				plan: ''
			}
		],
		navMain: [
			{
				title: 'Dashboard',
				url: '/dashboard',
				icon: SquareTerminalIcon,
				isActive: true
			},
			{
				title: 'Product',
				icon: BotIcon,
				url: '/product',
				items: [
					{
						title: 'List',
						url: '/product'
					},
					{
						title: 'Category',
						url: '/product-category'
					}
				]
			},
			{
				title: 'Users',
				url: '/users',
				icon: Users
			}
		]
	};
</script>

<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import { auth } from '../../stores/auth.ts';
	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<Sidebar.MenuButton size="lg">
			{#snippet child({ props })}
				<a href="##" {...props}>
					<div
						class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
					>
						<GalleryVerticalEndIcon class="size-4" />
					</div>
					<div class="flex flex-col gap-0.5 leading-none">
						<span class="font-medium">Segar Anugerah</span>
					</div>
				</a>
			{/snippet}
		</Sidebar.MenuButton>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={$auth.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
