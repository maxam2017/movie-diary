/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="@sveltejs/kit" />

/**
 * https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error
 */
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onoutclick?(): void;
  }
}
