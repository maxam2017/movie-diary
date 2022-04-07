<script lang="ts">
  import { goto } from '$app/navigation';
  import { _ } from 'svelte-i18n';

  import SearchInput from '$lib/components/search-input.svelte';
  import { config, configStatus } from '$lib/stores/config';

  import { term, movieList, moviePage } from '$lib/stores/movie';

  term.set({ trending: true });

  const index = Math.floor(Math.random() * 20);
  $: selectedMovie = $movieList[index];

  function generateHeroImageUrl(backdrop_path: string) {
    if (!$configStatus.fetched) return '';
    return $config.images.secure_base_url + 'w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)' + backdrop_path;
  }
</script>

<div
  class="hero"
  alt={selectedMovie?.title}
  title={selectedMovie?.title}
  style={$configStatus.fetched && $moviePage.fetched
    ? `background-image: linear-gradient(to right, rgba(var(--tmdbDarkBlue), 0.8) 0%, rgba(var(--tmdbLightBlue), 0.3) 100%), url("${generateHeroImageUrl(
        selectedMovie.backdrop_path,
      )}")`
    : ''}
>
  <div class="hero__title">
    <h2>{$_('page.home.hero.title')}</h2>
    <h3>{$_('page.home.hero.subtitle')}</h3>
    <SearchInput
      placeholder={$_('page.home.search.placeholder', { values: { keyword: selectedMovie?.title } })}
      on:search={(e) => {
        const q = e.detail;
        if (!q) return;
        goto(`/search?q=${q}`);
      }}
    />
  </div>
</div>

<style lang="scss">
  .hero {
    display: flex;
    align-items: center;
    width: 100%;
    height: 450px;
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: rgb(var(--tmdbDarkBlue));
  }

  .hero__title {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 40px;
  }

  h2 {
    color: white;
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 12px;
  }

  h3 {
    color: white;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 44px;
  }
</style>
