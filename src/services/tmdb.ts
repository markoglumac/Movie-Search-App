import { ApiError, NetworkError } from '@/types/errors'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

// --- Types ---

export interface Movie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
  overview: string
}

export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[]
  runtime: number | null
  tagline: string
  status: string
}

export interface SearchResponse {
  results: Movie[]
  total_results: number
  total_pages: number
}

// --- Helpers ---

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  let res: Response

  try {
    res = await fetch(`${BASE_URL}${endpoint}`)
  } catch {
    throw new NetworkError(endpoint)
  }

  if (!res.ok) {
    throw new ApiError(`Request failed for ${endpoint}`, res.status, endpoint)
  }

  return res.json() as Promise<T>
}

export function getPosterUrl(path: string | null): string {
  if (!path) return '/no-poster.png'
  return `https://image.tmdb.org/t/p/w500${path}`
}

// --- API calls ---

export async function searchMovies(query: string, page = 1): Promise<SearchResponse> {
  return fetchFromApi<SearchResponse>(
    `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
  )
}

export async function getMovieDetail(id: number): Promise<MovieDetail> {
  return fetchFromApi<MovieDetail>(`/movie/${id}?api_key=${API_KEY}`)
}

export async function getTrending(page = 1): Promise<SearchResponse> {
  return fetchFromApi<SearchResponse>(`/trending/movie/week?api_key=${API_KEY}&page=${page}`)
}
