<script>
  import Header from '$lib/components/header.svelte';
  import Snackbar from '$lib/components/snackbar.svelte';

  import '../app.css';
</script>

<div class="flex-1 flex flex-col">
  <Header />
  <slot />
  <Snackbar />
</div>

<style lang="postcss">
</style>
