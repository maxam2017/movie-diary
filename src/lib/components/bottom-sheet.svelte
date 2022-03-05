<script lang="ts">
  import { lock, unlock, clearBodyLocks } from 'tua-body-scroll-lock';
  import { clickOutside } from '$lib/actions/click-outside';
  import { drag } from '$lib/actions/drag';

  import { slide, fade } from 'svelte/transition';

  import Portal from './portal.svelte';
  import { onDestroy, onMount } from 'svelte';

  let isOpen = false;
  let sheetContentEl: HTMLDivElement;

  onDestroy(() => {
    if (typeof window === 'undefined') return;
    clearBodyLocks();
  });

  export function open(): void {
    isOpen = true;
    lock();
  }

  export function close(): void {
    isOpen = false;
    unlock();
  }

  $: if (isOpen) {
    if (typeof window !== 'undefined') {
      const svelteEl = document.querySelector('#svelte');
      svelteEl.classList.add('transition-[600ms]', 'transform', 'scale-[0.94]', 'translate-y-1', 'origin-center');
    }
  } else {
    if (typeof window !== 'undefined') {
      const svelteEl = document.querySelector('#svelte');
      svelteEl.classList.remove('scale-[0.94]', 'translate-y-1');
    }
  }
</script>

<Portal>
  {#if isOpen}
    <div class="backdrop" transition:fade={{ duration: 600 }} />
    <div
      use:clickOutside
      use:drag={{
        onClose: close,
        shouldDrag: () => sheetContentEl.scrollTop === 0,
      }}
      on:outclick={() => (isOpen = false)}
      transition:slide
      class="sheet"
    >
      <div class="sheet__header">
        <slot name="title" />
      </div>
      <div class="sheet__content" bind:this={sheetContentEl}>
        <slot name="content" />
      </div>
    </div>
  {/if}
</Portal>

<style lang="postcss">
  .backdrop {
    @apply bg-opacity-20 bg-black;
    @apply fixed top-0 left-0 w-full h-full;
  }

  .sheet {
    @apply fixed bottom-0 w-full h-[95%] flex flex-col overflow-hidden;
    @apply bg-white shadow-sm rounded-t-xl;
  }

  .sheet__header {
    @apply w-full h-[56px] flex justify-center items-center;
    @apply font-bold text-lg text-slate-800 bg-slate-50;
  }

  .sheet__content {
    @apply w-full flex-1 overflow-y-auto p-4;
  }
</style>
