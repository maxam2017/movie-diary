import { derived, get, writable } from 'svelte/store';
import { stringify } from 'qs';
import { keyBy, pick, uniq } from 'lodash-es';
import { supabase } from '$lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';
import safeGetDate from '$lib/utils/safeGetDate';
import { endOfMonth, startOfMonth } from 'date-fns';

const DefaultPage: Page = { loading: false, fetched: false, ids: [] };

// store preset
type Diary = {
  id: number;
  created_at: string;
  watched_at: string;
  diary_id: string;
  movie_id: number;
  review: string;
};

type PageInfo = {
  ids: number[];
};

type Status = {
  fetched?: boolean;
  loading?: boolean;
  error?: PostgrestError;
};

type Page = Union<PageInfo, Status>;

type Store = {
  data: { [id: string]: Diary };
  pages: { [pageKey: string]: Page };
};

const store = writable<Store>({ data: {}, pages: {} });

// request preset
type Args = {
  year: number;
  month: number;
};

function getKey(args: Args) {
  return stringify(args);
}

function dateToArgs(d: string | Date): Args {
  const date = d instanceof Date ? d : safeGetDate(d);
  return { year: date?.getFullYear(), month: date?.getMonth() + 1 };
}

function argsToDate(args: Args): Date {
  return new Date(args.year, args.month - 1);
}

export async function insertDiary(payload: {
  user_id: string;
  watched_at: string;
  movie_id: number;
  review: string;
}): Promise<void> {
  const { data, error } = await supabase.from<Diary>('diary').insert(payload);
  console.log(data);

  if (error) throw error;

  const item = data[0];

  if (item) {
    const pageKey = getKey(dateToArgs(item.watched_at));
    store.update((prevStore) => {
      return {
        ...prevStore,
        data: { ...prevStore.data, [item.id]: item },
        pages: {
          ...prevStore.pages,
          [pageKey]: { ...prevStore.pages[pageKey], ids: [...prevStore.pages[pageKey].ids, item.id] },
        },
      };
    });
  }
}

export async function selectDiary(args: Args = dateToArgs(new Date())): Promise<void> {
  const pageKey = getKey(args);
  if (get(store).pages[pageKey]?.fetched) return;

  store.update((prevStore) => {
    return {
      ...prevStore,
      pages: {
        ...prevStore.pages,
        [pageKey]: { ids: [], ...prevStore.pages[pageKey], loading: true, error: undefined },
      },
    };
  });

  const date = argsToDate(args);
  const { data, error } = await supabase
    .from<Diary>('diary')
    .select()
    .gte('watched_at', startOfMonth(date).toISOString())
    .lte('watched_at', endOfMonth(date).toISOString());

  if (error) {
    return store.update((prevStore) => {
      return {
        ...prevStore,
        pages: { ...prevStore.pages, [pageKey]: { ...prevStore.pages[pageKey], loading: false, error } },
      };
    });
  }

  const ids = data.map((result) => result.id);

  store.update((prevStore) => {
    return {
      ...prevStore,
      data: { ...prevStore.data, ...keyBy(data, (result) => result.id) },
      pages: {
        ...prevStore.pages,
        [pageKey]: {
          ...prevStore.pages[pageKey],
          loading: false,
          fetched: true,
          ids: uniq([...prevStore.pages[pageKey].ids, ...ids]),
        },
      },
    };
  });
}

const term = writable<Args>(dateToArgs(new Date()));
export { term };

const pageKey = derived(term, ($term) => getKey($term));

const diaryData = derived([store], ([$store]) => {
  return $store.data;
});
const diaryList = derived([pageKey, store], ([$pageKey, $store]) => {
  const data = $store.data;
  const ids = $store.pages[$pageKey]?.ids || [];
  return ids.map((id) => data[id]).filter(Boolean);
});
const diaryPage = derived([pageKey, store], ([$pageKey, $store]) => {
  const page = $store.pages[$pageKey];
  return Object.assign({}, DefaultPage, page);
});
// const diaryDates = derived([store], ([$pageKey]) => {
//   const page = $store.pages[$pageKey];
//   return Object.assign({}, DefaultPage, page);
// });

export { diaryData, diaryList, diaryPage };
