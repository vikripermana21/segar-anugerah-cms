<script lang="ts">
	import { page } from '$app/state';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	const { children } = $props();

	const urls = $derived.by(() => {
		let url = page.url.pathname.split('/');
		url.shift();

		return url;
	});
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ms-1" />
				<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						{#each urls as url, index}
							{#if index !== urls.length - 1}
								<Breadcrumb.Item class="hidden md:block">
									<Breadcrumb.Link href={`/${url}`} class="capitalize"
										>{url.replaceAll('-', ' ')}</Breadcrumb.Link
									>
								</Breadcrumb.Item>
								<Breadcrumb.Separator />
							{:else}
								<Breadcrumb.Page class="capitalize">{url.replaceAll('-', ' ')}</Breadcrumb.Page>
							{/if}
						{/each}
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</header>
		<div class="p-4">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
