<script lang="ts">
  import { goto } from '$app/navigation';
  import BottomSheet from '$lib/components/bottom-sheet.svelte';
  import Calendar from '$lib/components/calendar.svelte';

  import { user } from '$lib/stores/user';
  import { onMount } from 'svelte';

  onMount(() => {
    if (!$user) goto('/login');
  });

  let bottomSheet: BottomSheet;
</script>

<Calendar let:selected>
  <div class="panel">
    <button class="panel__button" on:click={bottomSheet.open}>
      <img class="w-6 h-6" alt="add diary" src="/plus.svg" />
      Add
    </button>
    nothing
  </div>
</Calendar>
<BottomSheet bind:this={bottomSheet}>
  <div slot="title">Add diary</div>
  <div slot="content" />
</BottomSheet>

<style lang="postcss">
  .panel {
    @apply relative flex-1 p-4 flex justify-center items-center;
    @apply bg-white text-slate-600;
  }

  .panel__button {
    @apply absolute right-4 top-4 flex p-2 items-center;
    @apply text-red-500;
  }
</style>
