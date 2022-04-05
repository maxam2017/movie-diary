<script lang="ts">
  import { config } from '$lib/stores/config';
  import { searchMovie, term, movieList, movieData, moviePage, listTrending } from '$lib/stores/movie';
  import safeGetDate from '$lib/utils/safeGetDate';

  import { clamp, debounce } from 'lodash-es';
  import { createEventDispatcher } from 'svelte';

  import Drawer from './drawer.svelte';
  import IntersectionObserver from './intersection-observer.svelte';

  let drawer: Drawer;

  let search = '';
  let selectedMovieId: number;
  $: {
    term.set(search ? { query: search, region: 'TW' } : { trending: true });
  }

  const handleSearch = () => {
    if (!search || ($moviePage.totalPages && $moviePage.totalPages < $moviePage.page + 1)) {
      return;
    }
    searchMovie({
      query: search,
      region: 'TW',
      page: $moviePage.page + 1,
    });
  };

  const debounceSearch = debounce(handleSearch, 500);

  function focus<T extends HTMLElement = HTMLInputElement>(node: T) {
    node.focus();
  }

  const dispatch = createEventDispatcher();

  function handleLoadMore() {
    if (search) {
      handleSearch();
    } else {
      listTrending({ page: $moviePage.page + 1 });
    }
  }

  export { selectedMovieId as value };
</script>

<label for="movie">movie</label>
<input
  name="movie"
  value={selectedMovieId ? $movieData[selectedMovieId]?.title : ''}
  placeholder="choose the movie you watched"
  on:keydown|preventDefault
  on:click={() => drawer.open()}
/>
<Drawer axis="y" bind:this={drawer}>
  <div slot="title">Choose movie 🎬</div>
  <div
    slot="action"
    class:disabled={!selectedMovieId}
    on:click={() => {
      drawer.close();
      dispatch('change', selectedMovieId);
    }}
  >
    Confrim
  </div>
  <div slot="content">
    <input
      class="content__input"
      use:focus
      bind:value={search}
      on:keydown={() => {
        debounceSearch();
      }}
      placeholder="search..."
    />
    {#each $movieList as movie, index}
      {#if index === clamp($movieList.length - 5, 0, $movieList.length - 1)}
        <IntersectionObserver on:intersection={handleLoadMore} />
      {/if}
      <div class="cell" class:selected={selectedMovieId === movie.id} on:click={() => (selectedMovieId = movie.id)}>
        <div
          alt={movie.title}
          class="thumbnail"
          style={movie.poster_path
            ? `background-image: url(${
                $config.images.secure_base_url + $config.images.poster_sizes?.[2] + movie.poster_path
              })`
            : ''}
        >
          {#if selectedMovieId === movie.id}
            <svg viewBox="0 0 24 24"
              ><path
                d="M9 16.17L5.53 12.7a1 1 0 00-1.4 0h-.01a1 1 0 000 1.41L8.3 18.3a1 1 0 001.4 0L20.3 7.7a1 1 0 000-1.41 1 1 0 00-1.41 0z"
              />
            </svg>
          {/if}
        </div>
        <div>
          <div class="title">
            {movie.title}
            {#if safeGetDate(movie.release_date)}
              ({safeGetDate(movie.release_date).getFullYear()})
            {/if}
          </div>
          {#if movie.original_title !== movie.title}
            <div class="subtitle">{movie.original_title}</div>
          {/if}
          <div class="desc">{movie.overview || '--'}</div>
        </div>
      </div>
    {/each}
  </div>
</Drawer>

<style lang="scss">
  label {
    display: block;
    margin-bottom: 6px;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  input {
    outline: none;
    display: block;
    height: 44px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    padding: 0 12px;
    margin-left: -2px;
  }

  .content__input {
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
  }

  .cell {
    display: flex;
    padding: 12px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &.selected {
      & .thumbnail {
        &::before {
          content: '';
          background: rgba(0, 0, 0, 0.45);
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .thumbnail {
    position: relative;
    align-self: center;
    flex: 0 0 60px;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    margin-right: 8px;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.05);
    background-size: cover;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
      width: 30px;
      height: 30px;
      z-index: 2;
      fill: white;
    }
  }

  .title {
    font-weight: 500;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }

  .subtitle {
    font-weight: 500;
    font-size: 12px;
    margin-top: -2px;
    margin-bottom: 2px;
    color: rgba(0, 0, 0, 0.35);
  }

  .desc {
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  div[slot='action'] {
    color: #3397cf;

    &.disabled {
      touch-action: none;
      pointer-events: none;
      color: rgba(0, 0, 0, 0.25);
    }
  }
</style>
