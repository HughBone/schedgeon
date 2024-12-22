<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { page } from '$app/stores';

	const pageTitle = $derived($page.url.pathname.split('/').at(-1));
	let { data, children } = $props();

	// setAppState(data.app);
</script>

<!-- this causes a hydration error... -->
<ModeWatcher />

<Toaster />

<Sidebar.Provider>
	<AppSidebar />

	<main class="h-screen w-full overflow-x-hidden">
		<div class="sticky top-0 z-10 flex items-center gap-x-1 bg-secondary px-1 py-2 shadow-md">
			<Sidebar.Trigger />
		</div>

		{@render children?.()}
	</main>
</Sidebar.Provider>
