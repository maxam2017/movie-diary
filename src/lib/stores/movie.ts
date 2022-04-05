import { derived, get, writable } from 'svelte/store';
import axios from 'axios';
import { stringify } from 'qs';
import { keyBy, pick } from 'lodash-es';

const DefaultPage: Page = { loading: false, fetched: false, ids: [], page: 0 };

// store preset
type Movie = {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

type PageInfo = {
  page?: number;
  totalPages?: number;
  totalResults?: number;
  ids: string[];
};

type Status = {
  fetched?: boolean;
  loading?: boolean;
  error?: Error;
};

type Page = Union<Status, PageInfo>;

type Store = {
  data: { [id: string]: Movie };
  pages: { [pageKey: string]: Page };
};

const store = writable<Store>({ data: {}, pages: {} });

// request preset
type PagingableArgs = {
  query: string;
  region?: string;
  include_adult?: boolean;
  year?: number;
  primary_release_year?: number;
};
type NonPagingableArgs = {
  page: number;
};
type SelfDefinedArgs = {
  trending?: boolean;
};
type Args = Union<Union<PagingableArgs, NonPagingableArgs>, SelfDefinedArgs>;

type SearchResponse = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
};

function getKey(args: Args) {
  return stringify(pick(args, ['query', 'region', 'include_adult', 'year', 'primary_release_year']));
}

export async function getMovie({ id }: { id: number }): Promise<void> {
  const existed = get(store).data[id];
  if (existed) return;

  try {
    const { data } = await axios.get<Movie>(`/api/tmdb/movie/${id}`);

    store.update((prevStore) => {
      return {
        ...prevStore,
        data: {
          ...prevStore.data,
          [data.id]: data,
        },
      };
    });
  } catch (err) {}
}

export async function listTrending({ page }: Pick<Args, 'page'>): Promise<void> {
  const pageKey = getKey({ trending: true });

  store.update((prevStore) => {
    return {
      ...prevStore,
      pages: {
        ...prevStore.pages,
        [pageKey]: { ids: [], ...prevStore.pages[pageKey], loading: true, error: undefined },
      },
    };
  });

  try {
    const { data } = await axios.get<SearchResponse>(`/api/tmdb/trending/movie/week?page=${page}`);
    const ids = data.results.map((result) => String(result.id));

    store.update((prevStore) => {
      return {
        ...prevStore,
        data: {
          ...prevStore.data,
          ...keyBy(data.results, (result) => result.id),
        },
        pages: {
          ...prevStore.pages,
          [pageKey]: {
            ...prevStore.pages[pageKey],
            page: data.page,
            totalPages: data.total_pages,
            totalResults: data.total_results,
            loading: false,
            fetched: true,
            ids: [...prevStore.pages[pageKey].ids, ...ids],
          },
        },
      };
    });
  } catch (err) {
    store.update((prevStore) => {
      return {
        ...prevStore,
        pages: {
          ...prevStore.pages,
          [pageKey]: {
            ...prevStore.pages[pageKey],
            loading: false,
            error: err,
          },
        },
      };
    });
  }
}

export async function searchMovie(args: Args): Promise<void> {
  const pageKey = getKey(args);

  store.update((prevStore) => {
    return {
      ...prevStore,
      pages: {
        ...prevStore.pages,
        [pageKey]: { ids: [], ...prevStore.pages[pageKey], loading: true, error: undefined },
      },
    };
  });

  try {
    const { data } = await axios.get<SearchResponse>(`/api/tmdb/search/movie?${stringify(args)}`);
    const ids = data.results.map((result) => String(result.id));

    store.update((prevStore) => {
      return {
        ...prevStore,
        data: {
          ...prevStore.data,
          ...keyBy(data.results, (result) => result.id),
        },
        pages: {
          ...prevStore.pages,
          [pageKey]: {
            ...prevStore.pages[pageKey],
            page: data.page,
            totalPages: data.total_pages,
            totalResults: data.total_results,
            loading: false,
            fetched: true,
            ids: [...prevStore.pages[pageKey].ids, ...ids],
          },
        },
      };
    });
  } catch (err) {
    store.update((prevStore) => {
      return {
        ...prevStore,
        pages: {
          ...prevStore.pages,
          [pageKey]: {
            ...prevStore.pages[pageKey],
            loading: false,
            error: err,
          },
        },
      };
    });
  }
}

const term = writable<Args>({});
export { term };

const pageKey = derived(term, ($term) => getKey($term));

const movieData = derived(store, ($store) => {
  return $store.data;
});
const movieList = derived([pageKey, store], ([$pageKey, $store]) => {
  const data = $store.data;
  const ids = $store.pages[$pageKey]?.ids || [];
  return ids.map((id) => data[id]).filter(Boolean);
});
const moviePage = derived([pageKey, store], ([$pageKey, $store]) => {
  const page = $store.pages[$pageKey];
  return Object.assign({}, DefaultPage, page);
});

export { movieData, movieList, moviePage };