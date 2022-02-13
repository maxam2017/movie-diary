export function clickOutside<T extends HTMLElement = HTMLDivElement>(node: T): { destroy(): void } {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as T)) {
      node.dispatchEvent(new CustomEvent('outclick'));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
