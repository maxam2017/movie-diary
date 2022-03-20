<script lang="ts">
  import { fade, TransitionConfig } from 'svelte/transition';

  import Portal from '../components/portal.svelte';
  import { bsl } from '$lib/actions/bsl';

  let isOpen = false;

  export let axis: 'x' | 'y';

  export function open(): void {
    isOpen = true;
  }

  export function close(): void {
    isOpen = false;
  }

  function slide(_node: HTMLDivElement, {}): TransitionConfig {
    return {
      duration: 150,
      css: (t, u) => {
        return `transform: translate${axis.toUpperCase()}(${u * 100}%)`;
      },
    };
  }
</script>

<Portal>
  {#if isOpen}
    <div class="backdrop" transition:fade={{ duration: 300 }} />
    <div transition:slide class="drawer">
      <div class="drawer__header">
        {#if axis === 'x'}
          <svg
            class="drawer__header__svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            on:click={() => close()}
          >
            <path
              d="M20 11H6.36l4.16-4.3a1 1 0 00-.02-1.41 1 1 0 00-1.41.02l-5.8 6a.96.96 0 00-.09.12.98.98 0 00-.12.2 1 1 0 00-.06.3L3 12a.99.99 0 00.08.38 1 1 0 00.21.32l6 6A1 1 0 0010 19a1 1 0 00.7-.3 1 1 0 000-1.4L6.42 13H20a1 1 0 001-1 1 1 0 00-1-1z"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="drawer__header__svg"
            viewBox="0 0 24 24"
            on:click={() => close()}
          >
            <path
              d="M13.2 12l5.6-5.6a.4.4 0 0 0 0-.6l-.6-.6a.4.4 0 0 0-.6 0L12 10.8 6.4 5.2a.4.4 0 0 0-.6 0l-.6.6a.4.4 0 0 0 0 .6l5.6 5.6-5.6 5.6a.4.4 0 0 0 0 .6l.6.6a.4.4 0 0 0 .6 0l5.6-5.6 5.6 5.6a.4.4 0 0 0 .6 0l.6-.6a.4.4 0 0 0 0-.6z"
            />
          </svg>
        {/if}
        <div class="drawer__header__title">
          <slot name="title" />
        </div>
        <div class="drawer__header__action">
          <slot name="action" />
        </div>
      </div>
      <div class="drawer__content" use:bsl>
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

  .drawer {
    @apply fixed top-0 w-full h-full flex flex-col overflow-hidden;
    @apply bg-white;
  }

  .drawer__header {
    @apply w-full h-[56px] flex justify-between items-center;
    @apply font-bold text-lg text-slate-800 bg-slate-50;
  }

  .drawer__header__svg {
    @apply w-6 h-6 ml-3 fill-slate-600;
  }

  .drawer__header__title {
    @apply absolute left-1/2 transform -translate-x-1/2;
  }

  .drawer__header__action {
    padding: 0 12px;
    @apply text-base font-semibold;
  }

  .drawer__content {
    @apply w-full flex-1 overflow-y-auto p-4;
  }
</style>
