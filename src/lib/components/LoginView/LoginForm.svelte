<script lang="ts">
  import FacebookButton from './FacebookButton.svelte';
  import GitHubButton from './GithubButton.svelte';
  import GoogleButton from './GoogleButton.svelte';
</script>

<div class="form">
  <h1 class="form__header">Sign In</h1>
  <div class="form__actions">
    <FacebookButton />
    <GoogleButton />
    <GitHubButton />
  </div>
</div>

<style lang="postcss">
  .form {
    @apply flex flex-col items-center;
    @apply w-fit min-h-[320px] m-auto p-6 rounded-lg;
    @apply bg-slate-200;
  }

  .form__header {
    @apply font-bold text-gray-700 text-xl mb-2;
  }

  .form__actions {
    @apply m-auto grid gap-4;
  }
</style>
