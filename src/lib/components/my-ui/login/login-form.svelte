<script lang="ts">
  import * as Form from "$ui/form/index.js";
  import { Input } from "$ui/input/index.js";
  import { zod, type ZodObjectType } from "sveltekit-superforms/adapters";
  import { superForm, defaults, setError } from "sveltekit-superforms";
  import { toast } from "svelte-sonner";
  import { loginSchema, registerSchema } from "$lib/schemas/AuthSchema";
  import LoadingSpinner from "$ui/loading-spinner.svelte";
  import PasswordInput from "$ui/password-input.svelte";
  import { onMount } from "svelte";
  import type { LoginResponse } from "$lib/types/auth/LoginType";

  let {
    schemaForm,
    formName,
  }: {
    schemaForm: ZodObjectType;
    formName: "login" | "register";
  } = $props();

  const isRegister = formName === "register";

  const form = superForm(defaults(zod(schemaForm)), {
    validators: zod(isRegister ? registerSchema : loginSchema),
    validationMethod: "oninput",
    SPA: true,
    onUpdate: async ({ form }) => {
      if (form.valid) {
        // Send post request to server
        const res: LoginResponse = await fetch("?formName=" + formName, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.data),
        })
          .then((data) => data.json())
          .catch(() => null);

        if (!res) {
          return setError(
            form,
            "Problem reaching server :(. Please try again later.",
          );
        }

        if (res?.success) {
          // TODO: navigate to /overview
        }
        // form-level error
        else if (res?.error) {
          return setError(form, res.error);
        }
        // field-level error
        else if (res?.formError) {
          for (const [field, errorStr] of Object.entries(res.formError)) {
            setError(form, field, errorStr);
          }
        }
      }
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
    // $formData.email = "test@gmail.com";
    // $formData.password = "Password1!";
  });
</script>

<form method="POST" use:enhance>
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

  <!-- form-level errors -->
  <div class="text-md mt-2 text-destructive">
    {$errors?._errors}
  </div>
</form>
