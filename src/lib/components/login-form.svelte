<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	import {
		loginSchema,
		registerSchema,
		type LoginSchema,
		type RegisterSchema
	} from '$lib/schemas/AuthSchema';
	import LoadingSpinner from '$lib/components/ui/loading-spinner.svelte';
	import PasswordInput from '$lib/components/ui/password-input.svelte';

	let {
		dataForm,
		actionStr
	}: {
		dataForm: RegisterSchema | LoginSchema;
		actionStr: '?/login' | '?/register';
	} = $props();

	const isRegister = actionStr === '?/register';

	const form = superForm(dataForm as RegisterSchema, {
		validators: zodClient(isRegister ? registerSchema : loginSchema)
	});

	const { form: formData, submitting, allErrors, enhance } = form;
</script>

<form method="POST" action={actionStr} use:enhance>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>{'Email'}</Form.Label>
				<Input disabled={$submitting} {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>{'Password'}</Form.Label>
				<PasswordInput disabled={$submitting} bind:password={$formData.password} {...props} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	{#if isRegister}
		<Form.Field {form} name="confirmPassword">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{'Confirm Password'}</Form.Label>
					<PasswordInput
						disabled={$submitting}
						bind:password={$formData.confirmPassword}
						{...props}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	{/if}

	<Form.Button class="mt-6" disabled={$submitting || $allErrors.length !== 0}>
		Submit
		<LoadingSpinner loaded={!$submitting} />
	</Form.Button>
</form>
