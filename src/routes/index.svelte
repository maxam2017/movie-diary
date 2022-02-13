<script lang="ts">
  import { user } from '$lib/stores/user';
</script>

<div class="hero">
  <h1 class="hero__title">
    Make your experience <span class="hero__title--highlight">merorable</span>
    <div class="button-wrapper">
      <a href={$user ? '/cal' : '/login'}>
        <button class="btn bg-slate-700 font-bold text-lg text-white"> Flim your life 🍿️</button>
      </a>
    </div>
  </h1>
</div>

<style lang="postcss">
  .hero {
    @apply pt-32 pb-12 md:pt-40 md:pb-20;
    @apply text-center;
  }

  .hero__title {
    @apply text-5xl md:text-6xl font-extrabold leading-snug mb-4 text-slate-700;
  }

  .hero__title--highlight {
    @apply inline-block;
    @apply bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600;
  }

  .button-wrapper {
    @apply my-10;
  }
</style>
