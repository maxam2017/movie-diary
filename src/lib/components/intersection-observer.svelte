<script lang="ts">
  export let once = false;

  import { createEventDispatcher, onMount } from 'svelte';

  let containerEl: HTMLDivElement;
  let intersecting: boolean;

  const dispatch = createEventDispatcher();

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      intersecting = entries[0].isIntersecting;
      if (intersecting) {
        dispatch('intersection');
        if (once) observer.unobserve(containerEl);
      }
    });

    observer.observe(containerEl);
    return () => observer.disconnect();
  });
</script>

<div bind:this={containerEl}>
  <slot {intersecting} />
</div>
