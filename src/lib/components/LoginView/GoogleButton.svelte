<script lang="ts">
  import { supabase } from '$lib/supabase';

  async function signInWithGoogle() {
    return supabase.auth.signIn({ provider: 'google' }, { redirectTo: window.location.origin + '/login' });
  }
</script>

<button class="google-btn" on:click={signInWithGoogle}>
  <img class="google-btn__logo" src="/google.svg" alt="google logo" />
  <span class="google-btn__text">Continue with Google</span>
</button>

<style lang="postcss">
  .google-btn {
    @apply flex items-center max-w-[272px] h-[40px];
    @apply bg-white text-gray-600 font-bold;
  }

  .google-btn__logo {
    @apply object-cover h-6 w-6;
  }

  .google-btn__text {
    @apply ml-2;
  }
</style>
