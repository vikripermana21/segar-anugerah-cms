<script lang="ts">
	import { Toaster } from '@/components/ui/sonner/index.js';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import './layout.css';

	const { children } = $props();

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<Toaster position="top-right" />
	{@render children()}
</QueryClientProvider>
