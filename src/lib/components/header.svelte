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
      <Button href={$user ? '/cal' : '/login'}>🍿️ Film your life</Button>
    {/if}
  </div>
</header>

<style lang="postcss">
  .header {
    z-index: 2;
    background-color: white;
    display: flex;
    justify-content: space-between;
    @apply sticky top-0 flex items-center py-4 lg:px-8 px-4;
    @apply font-bold text-xl transition justify-center md:justify-start;
  }

  .flex1 {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .header--shadow {
    /* @apply bg-white backdrop-blur-sm shadow-md; */
  }

  .header__title {
    @apply flex;
    @apply text-slate-700;
  }

  .header__logo {
    @apply lg:mr-4 mr-2;
  }
</style>
