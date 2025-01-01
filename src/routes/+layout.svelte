<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$ui/sonner/index.js";
  import { page } from "$app/state";
  import { onMount } from "svelte";

  const pageTitle = $derived(page.url.pathname.split("/").at(-1));
  let { data, children } = $props();

  onMount(async () => {
    if (data.user) {
      const user = await data.user;
      console.log(user);
    }
  });
</script>

<!-- this causes a hydration error... -->
<ModeWatcher />

<Toaster />

{@render children?.()}
