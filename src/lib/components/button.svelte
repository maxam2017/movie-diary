<script lang="ts">
  export let href: string = undefined;
</script>

{#if typeof href === 'string'}
  <a {href}><button {...$$restProps}><slot /></button></a>
{:else}
  <button {...$$restProps}> <slot /></button>
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
  }
</style>
