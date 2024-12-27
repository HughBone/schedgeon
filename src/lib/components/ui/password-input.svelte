<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import EyeIcon from 'lucide-svelte/icons/eye';
	import EyeOffIcon from 'lucide-svelte/icons/eye-off';

	let {
		password = $bindable(),
		disabled,
		...props
	}: {
		password: any;
		disabled: boolean;
	} = $props();

	let showPassword = $state(false);
</script>

<div class="flex items-center">
	<Input type={showPassword ? 'text' : 'password'} {disabled} bind:value={password} {...props} />

	<div class="cursor-pointer p-2">
		{#if showPassword}
			<EyeIcon onclick={() => (showPassword = false)} />
		{:else}
			<EyeOffIcon onclick={() => (showPassword = true)} />
		{/if}
	</div>
</div>
