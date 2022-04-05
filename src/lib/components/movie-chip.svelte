<script lang="ts">
  import { movieData, getMovie } from '$lib/stores/movie';
  import { onMount } from 'svelte';

  export let id: number;

  onMount(() => {
    if (id) getMovie({ id });
  });

  $: movie = $movieData[id];
</script>

{#if movie}
  <div>
    {movie.title}
    <div class="review">
      <slot />
    </div>
  </div>
{/if}

<style lang="scss">
  .review {
    margin: 4px 0 8px 0;
  }
</style>
