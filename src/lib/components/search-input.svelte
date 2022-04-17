<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';

  const dispatch = createEventDispatcher();
  export let placeholder = '';

  let value: string;

  function handleSearch() {
    dispatch('search', value);
  }
</script>

<div class="input-wrapper">
  <input
    {placeholder}
    bind:value
    on:keydown={(e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    }}
  />
  <button on:click={() => handleSearch()}>{$_('page.home.search.cta')}</button>
</div>

<style lang="scss">
  .input-wrapper {
    position: relative;
    width: 100%;
    height: 40px;
    max-width: 1080px;
    font-size: 1rem;

    @include desktop {
      height: 60px;
    }
  }

  input {
    outline: none;
    display: block;
    height: 100%;
    width: 100%;
    padding: 5px 30px;
    border-radius: 60px;
    background: rgba(255, 255, 255, 0.9);
    color: rgb(var(--tmdbDarkBlue));

    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }

    @include desktop {
    }
  }

  button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(20px, -50%);
    color: rgb(var(--white));
    background-image: linear-gradient(to right, rgba(var(--tmdbLightGreen), 1) 0%, rgba(var(--tmdbLightBlue), 1) 100%);
    height: 100%;
    padding: 0 32px;
    display: flex;
    align-items: center;
    border-radius: 60px;

    @include desktop {
      height: 60px;
    }
  }
</style>
