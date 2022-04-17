<script lang="ts">
  export let href: string = undefined;
  export let primary = false;
  let className = '';

  export { className as class };
</script>

{#if typeof href === 'string'}
  <a target={href.startsWith('https://') ? '_blank' : '_self'} rel="noopener" {href}
    ><button class:primary {...$$restProps} class={className}><slot /></button></a
  >
{:else}
  <button class:primary {...$$restProps} class={className}> <slot /></button>
{/if}

<style lang="scss">
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border-radius: 4px;
    font-size: 1rem;
    background: rgba(0, 0, 0, 0.85);
    color: rgb(var(--white));
    font-weight: 500;

    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }

    &.primary {
      background: rgb(var(--primary));
    }
  }
</style>
