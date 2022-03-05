<script>
  import { onMount, onDestroy } from 'svelte';
  let ref;
  let portalEl;

  onMount(() => {
    portalEl = document.createElement('div');
    portalEl.className = 'portal';
    document.body.appendChild(portalEl);
    portalEl.appendChild(ref);
  });

  onDestroy(() => {
    if (typeof window === 'undefined') return;
    document.body.removeChild(portalEl);
  });
</script>

<div class="hidden w-0">
  <div bind:this={ref}>
    <slot />
  </div>
</div>
