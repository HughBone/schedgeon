<script lang="ts">
  import * as Form from "$ui/form/index.js";
  import { Input } from "$ui/input/index.js";
  import { zod, type ZodObjectType } from "sveltekit-superforms/adapters";
  import { superForm, defaults } from "sveltekit-superforms";
  import { toast } from "svelte-sonner";
  import { loginSchema, registerSchema } from "$lib/schemas/AuthSchema";
  import LoadingSpinner from "$ui/loading-spinner.svelte";
  import PasswordInput from "$ui/password-input.svelte";
  import { onMount } from "svelte";

  let {
    schemaForm,
    actionStr,
  }: {
    schemaForm: ZodObjectType;
    actionStr: "?/login" | "?/register";
  } = $props();

  const isRegister = actionStr === "?/register";

  const form = superForm(defaults(zod(schemaForm)), {
    validators: zod(isRegister ? registerSchema : loginSchema),
    validationMethod: "oninput",
    SPA: true,
    onUpdate({ form }) {
      // TODO: send/validate on server
    },
  });

  const {
    form: formData,
    submitting,
    allErrors,
    errors,
    message,
    enhance,
  } = form;

  $effect(() => {
    if ($message && $message !== "") {
      toast($message);
    }
  });

  onMount(() => {
    // $formData.email = 'test@gmail.coma';
    // $formData.password = 'Password1!';
  });
</script>

<form method="POST" action={actionStr} use:enhance>
  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>{"Email"}</Form.Label>
        <Input disabled={$submitting} {...props} bind:value={$formData.email} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>{"Password"}</Form.Label>
        <PasswordInput
          disabled={$submitting}
          bind:password={$formData.password}
          {...props}
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  {#if isRegister}
    <Form.Field {form} name="confirmPassword">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>{"Confirm Password"}</Form.Label>
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
