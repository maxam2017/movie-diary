import { derived, writable } from 'svelte/store';
import axios from 'axios';

const DefaultStatus: Status = { fetched: false, loading: false };

// store preset
type ImageConfig = {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
};
type Config = {
  images: ImageConfig;
  change_keys: string[];
};

type Status = {
  fetched?: boolean;
  loading?: boolean;
  error?: Error;
};

type Store = {
  data: Partial<Config>;
  status: Status;
};

const store = writable<Store>({ data: {}, status: {} });

export async function getConfig(): Promise<void> {
  store.update((prevStore) => {
    return {
      ...prevStore,
      status: { loading: true, error: undefined },
    };
  });

  try {
    const { data } = await axios.get<Config>('/api/tmdb/configuration');
    store.update((prevStore) => {
      return { ...prevStore, data, status: { loading: false, fetched: true } };
    });
  } catch (err) {
    store.update((prevStore) => {
      return { ...prevStore, status: { loading: false, error: err } };
    });
  }
}

const config = derived([store], ([$store]) => $store.data);
const configStatus = derived([store], ([$store]) => {
  const status = $store.status;
  return Object.assign({}, DefaultStatus, status);
});

export { config, configStatus };
