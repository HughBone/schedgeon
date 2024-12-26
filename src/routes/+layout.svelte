<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { page } from '$app/stores';

	const pageTitle = $derived($page.url.pathname.split('/').at(-1));
	let { data, children } = $props();
</script>

<!-- this causes a hydration error... -->
<ModeWatcher />

<Toaster />

{@render children?.()}
