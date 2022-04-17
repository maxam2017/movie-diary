<script context="module" lang="ts">
  export async function load() {
    await listTrending({ page: 1 });
    return { status: 200 };
  }
</script>

<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';

  import { _ } from 'svelte-i18n';

  import { listTrending, movieList } from '$lib/stores/movie';
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
  import MovieGrid from '$lib/components/movie-grid.svelte';
</script>

<Header />
<Hero />

<h3>{$_('page.home.header.popular')}</h3>

<svelte:component this={MovieGrid} items={$movieList} />

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
