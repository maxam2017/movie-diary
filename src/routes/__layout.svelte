<script context="module">
  import '$lib/i18n';
  import { waitLocale } from 'svelte-i18n';

  export async function preload() {
    return waitLocale();
  }

  export async function load() {
    const promise = getConfig();
    if (typeof window === 'undefined') await promise;
    return { status: 200 };
  }
</script>

<script>
  import Snackbar from '$lib/components/snackbar.svelte';

  import '../app.css';
  import { getConfig } from '$lib/stores/config';
  import { isLoading } from 'svelte-i18n';
</script>

<div class="flex-1 flex flex-col">
  {#if !$isLoading}
    <slot />
  {/if}
  <Snackbar />
</div>
