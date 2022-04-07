<script context="module">
  import '$lib/i18n';
  import { waitLocale } from 'svelte-i18n';

  export async function preload() {
    return waitLocale();
  }

  export async function load() {
    await getConfig();
    return { status: 200 };
  }
</script>

<script>
  import Snackbar from '$lib/components/snackbar.svelte';

  import '../app.css';
  import { getConfig } from '$lib/stores/config';
</script>

<div class="flex-1 flex flex-col">
  <slot />
  <Snackbar />
</div>
