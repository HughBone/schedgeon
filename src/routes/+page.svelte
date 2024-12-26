<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { PageData } from './$types';
	import LoginForm from '$lib/components/login-form.svelte';

	const SIGNIN = 'signin';
	const SIGNUP = 'signup';
	let { data }: { data: PageData } = $props();
</script>

<div class="m-auto h-full w-[400px] content-center">
	<h1 class="py-5 text-center text-4xl">Schedgeon</h1>

	<Tabs.Root value={SIGNIN}>
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value={SIGNIN}>Login</Tabs.Trigger>
			<Tabs.Trigger value={SIGNUP}>Signup</Tabs.Trigger>
		</Tabs.List>
		<!-- Need div to stop tabs shifting vert center -->
		<div class="min-h-[354px]">
			<Tabs.Content value={SIGNIN}>
				<Card.Root>
					<Card.Content class="space-y-2">
						<LoginForm dataForm={data.loginForm} actionStr="?/login" />
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value={SIGNUP}>
				<Card.Root>
					<Card.Content class="space-y-2">
						<LoginForm dataForm={data.registerForm} actionStr="?/register" />
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
		</div>
	</Tabs.Root>
</div>
