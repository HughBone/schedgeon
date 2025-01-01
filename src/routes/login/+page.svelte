<script lang="ts">
  import * as Tabs from "$ui/tabs/index.js";
  import * as Card from "$ui/card/index.js";
  import LoginForm from "$lib/components/my-ui/login/login-form.svelte";
  import { loginSchema, registerSchema } from "$lib/schemas/AuthSchema";

  const SIGNIN = "signin";
  const SIGNUP = "signup";
</script>

<!-- Top vignette -->
<div
  class="absolute left-0 top-0 z-[-1] h-1/4 w-full bg-gradient-to-b from-black to-transparent opacity-25"
></div>
<!-- Bottom vignette -->
<div
  class="absolute bottom-0 left-0 z-[-1] h-1/4 w-full bg-gradient-to-t from-black to-transparent opacity-25"
></div>

<!-- Login/Signup -->
<div class="m-auto h-full max-w-[400px] content-center px-2">
  <h1 class="text-center text-4xl">Schedgeon</h1>
  <h2 class="mb-4 text-center text-sm text-muted-foreground">
    Start schedging today.
  </h2>

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
            <LoginForm schemaForm={loginSchema} formName="login" />
          </Card.Content>
        </Card.Root>
      </Tabs.Content>
      <Tabs.Content value={SIGNUP}>
        <Card.Root>
          <Card.Content class="space-y-2">
            <LoginForm schemaForm={registerSchema} formName="register" />
          </Card.Content>
        </Card.Root>
      </Tabs.Content>
    </div>
  </Tabs.Root>
</div>
