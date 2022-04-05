<script lang="ts">
  import { snackbarStore } from '$lib/stores/snackbar';
  import { fade } from 'svelte/transition';

  $: payload = $snackbarStore[0];
</script>

{#if payload}
  <div transition:fade={{ duration: 200 }} class="snackbar">
    {payload.text}
  </div>
{/if}

<style lang="scss">
  .snackbar {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 16px;
    width: calc(100vw - 32px);
    padding: 14px 16px;
    background: rgba(36, 40, 45, 0.95);
    border-radius: 12px;
    color: white;
    font-size: 14px;
  }
</style>
