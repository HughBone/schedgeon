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

	const { form: formData, errors, enhance } = form;
	const hasErrors = $derived(Object.keys($errors).length !== 0);
</script>

<form method="POST" action={actionStr} use:enhance>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>{'Email'}</Form.Label>
				<Input {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>{'Password'}</Form.Label>
				<Input {...props} bind:value={$formData.password} type="password" />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	{#if isRegister}
		<Form.Field {form} name="confirmPassword">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{'Confirm Password'}</Form.Label>
					<Input {...props} bind:value={$formData.confirmPassword} type="password" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	{/if}

	<Form.Button class="mt-6" disabled={hasErrors}>Submit</Form.Button>
</form>
