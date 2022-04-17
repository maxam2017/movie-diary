import { onDestroy, onMount } from 'svelte';
import { readable } from 'svelte/store';

type DeviceStore = Record<'mobile' | 'pad' | 'desktop', boolean>;

function getDevice(w: number) {
  let mobile = false,
    pad = false,
    desktop = false;
  if (window.matchMedia('(min-width: 768px)').matches) {
    desktop = true;
  } else if (window.matchMedia('(min-width: 640px)').matches) {
    pad = true;
  } else {
    mobile = true;
  }
  return { mobile, pad, desktop };
}

/**
 * @description judge device by width
 */
export const device = readable<DeviceStore>({} as DeviceStore, function start(set) {
  onMount(() => {
    set(getDevice(window.innerWidth));
  });

  function listener() {
    set(getDevice(window.innerWidth));
  }

  onMount(() => {
    window.addEventListener('resize', listener);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      return () => window.removeEventListener('resize', listener);
    }
  });
});
