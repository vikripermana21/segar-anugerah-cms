<script lang="ts">
	import { Toaster } from '@/components/ui/sonner/index.js';
	import { QueryClientProvider } from '@sveltestack/svelte-query';
	import './layout.css';
	import { queryClient } from '../config/client.ts';

	const { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
	<Toaster position="top-right" />
	{@render children()}
</QueryClientProvider>
