<script lang="ts">
  import { supabase } from '$lib/supabase';

  async function signInWithFacebook() {
    return supabase.auth.signIn({ provider: 'facebook' }, { redirectTo: window.location.origin + '/login' });
  }
</script>

<button class="fb-btn" on:click={signInWithFacebook}>
  <img class="fb-btn__logo" src="https://www.facebook.com/rsrc.php/v3/y9/r/OF6ddsGKpeB.png" alt="facebook logo" />
  <span class="fb-btn__text">Continue with Facebook</span>
</button>

<style lang="postcss">
  .fb-btn {
    @apply flex items-center max-w-[272px] h-[40px];
    @apply bg-facebook text-white font-bold;
  }

  .fb-btn__logo {
    @apply object-cover h-6 w-6;
  }

  .fb-btn__text {
    @apply ml-2 text-sm;
  }
</style>
