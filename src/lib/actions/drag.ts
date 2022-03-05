import { clamp } from 'lodash-es';

type Options = {
  shouldDrag?(): boolean;
  onMove?(v: number /* min: 0, max: 1 */): void;
  onClose?(): void;
};

export function drag<T extends HTMLElement = HTMLDivElement>(node: T, options: Options): { destroy(): void } {
  let dragging = false;
  let initY: number;
  let clientTop: number;

  const handleTouchStart = (event: TouchEvent) => {
    if (!options.shouldDrag || options.shouldDrag()) {
      dragging = true;
      clientTop = node.getBoundingClientRect().top;
      initY = event.touches[0].clientY;
      node.style.transition = '';
    }
  };

  let touchY: number;

  const handleTouchMove = (event: TouchEvent) => {
    if (!dragging) return;

    touchY = event.touches[0].clientY;
    const offsetY = touchY - initY;
    options.onMove?.(clamp(offsetY / (window.innerHeight - initY), 0, 1));
    node.style.transform = `translateY(${Math.max(0, offsetY * 1.1)}px)`;
  };

  const handleTouchEnd = () => {
    const shouldClose = (touchY - clientTop) * 2 >= node.clientHeight;
    node.style.transition = '200ms';
    node.style.transform = shouldClose ? 'translateY(100vh)' : '';
    dragging = false;

    if (shouldClose) options.onClose?.();
  };

  node.addEventListener('touchstart', handleTouchStart);
  node.addEventListener('touchmove', handleTouchMove);
  node.addEventListener('touchend', handleTouchEnd);

  return {
    destroy() {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchmove', handleTouchMove);
      node.removeEventListener('touchend', handleTouchEnd);

      node.style.transform = '';
      node.style.transition = '';
    },
  };
}
