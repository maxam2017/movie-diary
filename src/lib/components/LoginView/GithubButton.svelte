<script lang="ts">
  import { supabase } from '$lib/supabase';

  async function signInWithgithub() {
    return supabase.auth.signIn({ provider: 'github' }, { redirectTo: window.location.origin + '/login' });
  }
</script>

<button class="github-btn" on:click={signInWithgithub}>
  <img class="github-btn__logo" src="/github.svg" alt="github logo" />
  <span class="github-btn__text">Continue with GitHub</span>
</button>

<style lang="postcss">
  .github-btn {
    @apply flex items-center max-w-[272px] h-[40px];
    @apply bg-github text-white font-bold;
  }

  .github-btn__logo {
    @apply object-cover h-6 w-6;
  }

  .github-btn__text {
    @apply ml-2;
  }
</style>
