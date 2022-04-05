<script lang="ts">
  // form
  import { createForm } from 'svelte-forms-lib';
  import * as yup from 'yup';
  type FormValue = {
    movieId?: number;
    review: string;
  };
  export let onSubmit: (values: FormValue) => void;
  const { form, errors, handleReset, handleChange, handleSubmit, updateField, isValid, validateField, isSubmitting } =
    createForm<FormValue>({
      initialValues: { review: '' },
      validationSchema: yup.object().shape({
        movieId: yup.number().required(),
        review: yup.string().required(),
      }),
      onSubmit: async (values) => {
        try {
          await onSubmit?.(values);
          drawer.close();
        } catch {}
      },
    });

  // drawer
  import Drawer from './drawer.svelte';
  import MovieInput from './movie-input.svelte';
  let drawer: Drawer;
  export function open() {
    drawer.open();
  }
  export function close() {
    drawer.close();
  }
</script>

<Drawer axis="x" bind:this={drawer} on:close={() => handleReset()}>
  <div slot="title">Add diary</div>
  <div slot="action" class:disabled={!$isValid} on:click={handleSubmit}>Save</div>
  <div slot="content">
    <MovieInput
      value={$form.movieId}
      on:change={(event) => {
        updateField('movieId', event.detail);
        validateField('movieId');
      }}
    />

    {#if $errors.movieId}
      <small>{$errors.movieId && 'choose the movie you watched'}</small>
    {/if}
    <label for="review">about this movie, you wanna say...</label>
    <textarea
      name="review"
      rows={10}
      placeholder="please write down your review"
      bind:value={$form.review}
      on:keyup={handleChange}
      on:blur={handleChange}
    />
    {#if $errors.review}
      <small>{$errors.review && 'please write down your review'}</small>
    {/if}
  </div>
</Drawer>

<style lang="scss">
  label {
    display: block;
    margin-bottom: 6px;

    &:not(:first-of-type) {
      margin-top: 20px;
    }

    &::first-letter {
      text-transform: capitalize;
    }
  }

  textarea {
    outline: none;
    display: block;
    resize: none;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    padding: 12px;
    margin-left: -2px;
  }

  small {
    color: rgb(239, 68, 68);
    margin-left: 12px;
  }

  div[slot='action'] {
    color: #3397cf;

    &.disabled {
      touch-action: none;
      pointer-events: none;
      color: rgba(0, 0, 0, 0.55);
    }
  }
</style>
