<script lang="ts">
  import { page } from '$app/stores';
  import { user } from '$lib/stores/user';

  import Button from './button.svelte';

  let pageOffsetY: number;
</script>

<svelte:window bind:scrollY={pageOffsetY} />

<header class="header" class:header--shadow={pageOffsetY > 10}>
  <a href="/">
    <h1 class="header__title">
      <div class="header__logo">🍿️</div>
      Movie Diary
    </h1>
  </a>
  <div class="flex1">
    {#if $page.url.pathname !== '/cal'}
      <Button class="button" href={$user ? '/cal' : '/login'}>🍿️ Film your life</Button>
    {/if}
  </div>
</header>

<style lang="scss">
  .header {
    z-index: 2;
    background-color: white;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;

    padding: 12px 16px;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.75rem;

    @include desktop {
      font-size: 1.25rem;
      padding: 16px 32px;
    }
  }

  :global(.button) {
    font-size: 12px !important;

    @include desktop {
      font-size: 1rem !important;
    }
  }

  .flex1 {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .header__title {
    display: flex;
    color: rgb(51 65 85);
  }

  .header__logo {
    margin-right: 8px;
  }
</style>
