<script lang="ts">
	import type { PageData } from './$types';
	import LoadingPage from '$lib/components/pages/loading-page.svelte';
	import { onMount } from 'svelte';

	const { data }: { data: PageData } = $props();
	let page: 'loading' | 'login' | 'overview' = $state(!data.user ? 'login' : 'loading');

	onMount(async () => {
		if (data.user) {
			data.user.then((user) => {
				if (user) {
					page = 'overview';
				} else {
					page = 'login';
				}
			});
		} else {
			page = 'login';
		}
	});
</script>

{#if page === 'loading'}
	<LoadingPage />
{:else if page === 'login'}
	<h1>login page</h1>
	<!-- <LoginPage /> -->
{:else if page === 'overview'}
	<h1>overview page</h1>
	<!-- <OverviewPage /> -->
{/if}
