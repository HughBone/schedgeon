<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	let {
		loaded,
		class: classes = '',
		stroke = 2
	}: { loaded?: boolean; class?: string; stroke?: number } = $props();
</script>

{#if !loaded}
	<div class={classes}>
		<LoaderCircle class={'h-[100%] w-[1em] animate-spin'} strokeWidth={stroke} />
	</div>
{/if}
