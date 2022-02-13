<script>
  import Header from '$lib/components/header.svelte';

  import '../app.css';
</script>

<div class="flex-1 flex flex-col">
  <Header />
  <slot />
</div>

<style lang="postcss">
</style>
