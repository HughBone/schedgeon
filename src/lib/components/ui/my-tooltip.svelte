<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { Snippet } from 'svelte';

	let { trigger, content }: { trigger: Snippet; content: Snippet } = $props();
</script>

<Tooltip.Provider delayDuration={0}>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{@render trigger()}
		</Tooltip.Trigger>
		<Tooltip.Content>
			{@render content()}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
