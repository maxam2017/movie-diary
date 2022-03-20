import { lock, unlock } from 'tua-body-scroll-lock';

/**
 * WARNING: this action is useful but dirty and has a misleading name.
 * this purpose of this action is making body locked, but let target node still scrollable.
 */
export function bsl<T extends HTMLElement = HTMLDivElement>(node: T): { destroy(): void } {
  lock(node);
  return {
    destroy() {
      unlock(node);
    },
  };
}
