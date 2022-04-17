<script context="module" lang="ts">
  export async function load({ url }: LoadInput) {
    await searchMovie({ query: url.searchParams.get('q'), region: 'TW' });
    return { status: 200 };
  }
</script>

<script lang="ts">
  import { term, movieList, searchMovie, moviePage, movieData } from '$lib/stores/movie';
  import { page } from '$app/stores';
  import type { LoadInput } from '@sveltejs/kit/types/private';
  import MovieGrid from '$lib/components/movie-grid.svelte';
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
  import { _ } from 'svelte-i18n';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import IntersectionObserver from '$lib/components/intersection-observer.svelte';

  let value = $page.url.searchParams.get('q');
  let inputEl: HTMLInputElement;

  onMount(() => {
    inputEl.focus();
  });

  term.set({ query: value, region: 'TW' });
</script>

<Header />
<input
  bind:this={inputEl}
  bind:value
  placeholder={$_('page.home.search.placeholder.mobile')}
  on:keydown={(e) => {
    if (e.key === 'Enter') {
      goto(`/search?q=${value}`);
      term.set({ query: value, region: 'TW' });
    }
  }}
/>
{#if $moviePage.fetched && $movieList.length === 0}
  <div class="empty">
    <img src="/not-found.png" alt="not found" />
    <div class="empty__hint">{$_('page.home.search.not-found')}</div>
  </div>
{/if}
<MovieGrid items={$movieList} />
<IntersectionObserver
  on:intersection={() => {
    if (!value || ($moviePage.totalPages && $moviePage.totalPages < $moviePage.page + 1)) {
      return;
    }
    searchMovie({ query: value, region: 'TW', page: $moviePage.page + 1 });
  }}
/>
<Footer />

<style lang="scss">
  input {
    outline: none;
    display: block;
    height: 60px;
    width: 100%;
    padding: 5px 30px;
    background: rgba(var(--tmdbDarkBlue), 0.8);
    color: white;
    font-size: 1.2rem;

    &::placeholder {
      color: rgba(var(--white), 0.8);
    }
  }

  img {
    display: flex;
    justify-self: center;
    align-self: center;
    width: 50%;
    max-width: 400px;
    min-width: 240px;
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 60px;
  }

  .empty__hint {
    margin-top: 30px;
    font-size: 16px;
    color: #333;
  }
</style>
