<script context="module" lang="ts">
  export async function load({ params }: LoadInput) {
    const movie = await getMovie({ id: parseInt(params.movieId) });
    return { status: 200, props: { movie } };
  }
</script>

<script lang="ts">
  import { getMovie, Movie } from '$lib/stores/movie';
  import type { LoadInput } from '@sveltejs/kit/types/private';
  import { config } from '$lib/stores/config';
  import Header from '$lib/components/header.svelte';
  import safeGetDate from '$lib/utils/safeGetDate';
  import Footer from '$lib/components/footer.svelte';
  import { toEmoji } from '$lib/utils/iso3166ToEmoji';
  import Button from '$lib/components/button.svelte';
  import { user } from '$lib/stores/user';
  import { device } from '$lib/stores/device';
  import { _ } from 'svelte-i18n';

  export let movie: Movie;

  let backdropSrc: string;
  let posterSrc: string;
  let companySrcs: { src: string; alt: string }[];
  let countries: string[];

  $: {
    if ($config && movie) {
      backdropSrc = $config.images.secure_base_url + $config.images.backdrop_sizes[2] + movie.backdrop_path;
      posterSrc = $config.images.secure_base_url + $config.images.poster_sizes[4] + movie.poster_path;
      companySrcs = (movie.production_companies || [])
        .filter((c) => Boolean(c.logo_path))
        .map((c) => ({
          src: $config.images.secure_base_url + $config.images.logo_sizes[2] + c.logo_path,
          alt: c.name,
        }));

      countries = (movie.production_countries || []).map((c) => toEmoji(c.iso_3166_1));
    }
  }
</script>

<Header />
{#if movie}
  {#if $device.mobile || $device.pad}
    <img alt={`${movie.title} movie backdrop`} class="backdrop" src={backdropSrc} />
  {/if}
  <div class="wrapper">
    <h1 class="title">
      {movie.title} ({safeGetDate(movie.release_date).getFullYear()}) {#each countries as country}
        {country}
      {/each}
    </h1>
    <div class="flex-1" />
    {#if $device.desktop}
      <div class="logo-wrapper">
        {#each companySrcs as c}
          <img class="logo" alt={c.alt} src={c.src} />
        {/each}
      </div>
    {/if}
  </div>

  <div class="wrapper">
    {#if $device.desktop}
      <img alt={`${movie.title} movie poster`} class="poster" src={posterSrc} />
    {/if}

    <div class="column-wrapper">
      {#if movie.tagline}
        <h2>- {movie.tagline}</h2>
      {/if}
      <p>{movie.overview}</p>
      <div class="flex flex-wrap gap-4">
        {#if movie.homepage}
          <Button href={movie.homepage}>{$_('page.detail.official')}</Button>
        {/if}
        <Button href={'https://www.imdb.com/title/' + movie.imdb_id}>IMDB</Button>
        <Button href={'https://letterboxd.com/tmdb/' + movie.id}>Letterboxd</Button>
        <Button primary href={$user ? '/cal' : '/login'}>{$_('page.detail.review-now')}</Button>
      </div>
    </div>
  </div>
  <div class="flex-1" />
{/if}
<Footer />

<style lang="scss">
  .wrapper {
    display: flex;
    width: 100%;
    padding: 8px 24px;
  }

  .column-wrapper {
    display: grid;
    flex: 1;
  }

  .title {
    font-size: 1.2rem;
    line-height: 3;
    font-weight: 600;
    color: rgb(var(--tmdbDarkBlue));

    @include desktop {
      font-size: 1.4rem;
      line-height: 3;
    }
  }

  .backdrop {
    width: 100%;
  }

  .poster {
    width: 240px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 24px;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 24px;
    margin-top: 8px;
    margin-bottom: 12px;
  }

  .logo {
    height: 22px;
    margin-left: 12px;
  }

  p {
    line-height: 2;
    padding-bottom: 24px;
  }

  h2 {
    font-size: 1.6em;
    font-weight: 500;
    font-style: italic;
    color: rgb(var(--tmdbDarkBlue));
    margin-bottom: 22px;
  }
</style>
