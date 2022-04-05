import { writable } from 'svelte/store';

type SnackbarPayload = {
  text: string;
};

const store = writable<SnackbarPayload[]>([]);

function snackbar(payload: SnackbarPayload, durationMs = 1500): void {
  store.update((prev) => [...prev, payload]);

  setTimeout(() => {
    store.update((prev) => prev.filter((v) => v !== payload));
  }, durationMs);
}

function dismissAll(): void {
  store.set([]);
}

export { snackbar, dismissAll, store as snackbarStore };
