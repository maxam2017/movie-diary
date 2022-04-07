<script lang="ts">
  import { config } from '$lib/stores/config';

  import type { Movie } from '$lib/stores/movie';
  import safeGetDate from '$lib/utils/safeGetDate';

  export let items: Movie[] = [];
</script>

<div class="scroller">
  <div class="scroller__inner">
    {#each items as movie}
      <a class="cell" href={`/movie/${movie.id}`}>
        <div
          alt={movie.title}
          class="thumbnail"
          style={movie.poster_path && config
            ? `background-image: url(${
                $config.images.secure_base_url + $config.images.poster_sizes?.[2] + movie.poster_path
              })`
            : ''}
        />
        <div>
          <div class="title">
            {movie.title}
          </div>
          {#if movie.original_title !== movie.title}
            <div class="subtitle">{movie.original_title}</div>
          {/if}
        </div>
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  .scroller {
    width: 100%;
    overflow-x: auto;
    padding: 0 24px;
  }

  .scroller__inner {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 16px;
  }

  .cell {
    display: block;
    min-width: 200px;
  }

  .title {
    font-weight: 600;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .subtitle {
    font-weight: 500;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.65);
    margin-top: 4px;
  }

  .thumbnail {
    position: relative;
    align-self: center;
    flex: 0 0 60px;
    width: 100%;
    height: 0;
    padding-top: 100%;
    border-radius: 8px;
    margin-right: 8px;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.05);
    background-size: cover;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
