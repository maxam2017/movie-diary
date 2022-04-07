import type { RequestHandler } from '@sveltejs/kit';

const TMDB_ENDPOINT = 'https://api.themoviedb.org/3';

export const get: RequestHandler = async ({ params, url }) => {
  const searchParams = url.searchParams;
  searchParams.set('api_key', import.meta.env.VITE_TMDB_API_KEY + '');
  if (!searchParams.get('language')) searchParams.set('language', 'en-US');
  const search = searchParams.toString();
  const input = TMDB_ENDPOINT + `/${params.slug}` + (search ? `?${search}` : '');

  try {
    const res = await fetch(input);
    const json = await res.json();
    if (res.ok) return { body: json };
    return {
      status: res.status,
      body: { code: res.status, message: json.message },
    };
  } catch (err) {
    return {
      status: 500,
      body: { code: 500, message: `internal server error: ${err.message}` },
    };
  }
};
