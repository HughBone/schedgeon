<script lang="ts">
  import * as Sidebar from "$ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import { page } from "$app/stores";

  const pageTitle = $derived($page.url.pathname.split("/").at(-1));
  let { data, children } = $props();

  // setAppState(data.app);
</script>

<Sidebar.Provider>
  <AppSidebar />

  <main class="h-screen w-full overflow-x-hidden">
    <div
      class="sticky top-0 z-10 flex items-center gap-x-1 bg-secondary px-1 py-2 shadow-md"
    >
      <Sidebar.Trigger />
    </div>

    {@render children?.()}
  </main>
</Sidebar.Provider>
