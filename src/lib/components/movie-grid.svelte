<script lang="ts">
  import { config } from '$lib/stores/config';

  import type { Movie } from '$lib/stores/movie';

  export let items: Movie[] = [];
</script>

<div class="grid">
  {#each items as movie}
    <a class="cell" href={`/movie/${movie.id}`}>
      <div
        alt={movie.title}
        class="thumbnail"
        style={movie.poster_path && config
          ? `background-image: url(${
              $config.images.secure_base_url + $config.images.poster_sizes?.[3] + movie.poster_path
            })`
          : ''}
      />
      <div>
        <div class="title">
          {movie.title}
        </div>
      </div>
    </a>
  {/each}
</div>

<style lang="scss">
  .grid {
    width: 100%;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(2, 1fr);

    @include pad {
      grid-template-columns: repeat(3, 1fr);
    }

    @include desktop {
      grid-template-columns: repeat(5, 1fr);
      padding: 0 24px;
    }
  }

  .cell {
    display: block;
    min-width: 200px;
    padding: 24px;
    border-radius: 8px;

    .thumbnail {
      &::after {
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        transition: all 0.2s;
        background-color: rgba(var(--tmdbDarkBlue), 0.35);
      }
    }

    &:hover {
      .thumbnail {
        &::after {
          content: '';
          background-color: transparent;
        }
      }
      box-shadow: 0px 0px 24px rgba(var(--tmdbDarkBlue), 0.15);
    }
  }

  .title {
    font-weight: 600;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 6px;
  }

  .thumbnail {
    position: relative;
    align-self: center;
    flex: 0 0 60px;
    width: 100%;
    height: 0;
    padding-top: 100%;
    border-radius: 12px;
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
