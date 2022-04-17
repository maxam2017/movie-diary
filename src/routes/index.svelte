<script context="module" lang="ts">
  export async function load({ fetch }: LoadInput) {
    const movies = (await listTrending({ page: 1 }, fetch)) || [];
    return { status: 200, props: { movies } };
  }
</script>

<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';

  import { _ } from 'svelte-i18n';

  import { listTrending, Movie } from '$lib/stores/movie';
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
  import MovieGrid from '$lib/components/movie-grid.svelte';
  import type { LoadInput } from '@sveltejs/kit/types/private';

  export let movies: Movie[] = [];
</script>

<Header />
<Hero />

<h3>{$_('page.home.header.popular')}</h3>

<svelte:component this={MovieGrid} items={movies} />

<div class="padding" />
<Footer />

<style lang="scss">
  h3 {
    display: flex;
    align-items: center;
    height: 72px;
    padding: 0 24px;
    font-size: 1.2rem;
    font-weight: 600;

    @include desktop {
      font-size: 1.4rem;
      font-weight: 600;
    }
  }

  .padding {
    height: 60px;
  }
</style>
