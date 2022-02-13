<script lang="ts">
  import { goto } from '$app/navigation';

  import LoginForm from '$lib/components/LoginView/LoginForm.svelte';
  import { user } from '$lib/stores/user';

  $: if ($user) {
    goto('/cal', { replaceState: true });
  }
</script>

{#if !$user}
  <LoginForm />
{/if}
