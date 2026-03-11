import { ref, onMounted } from 'vue'
import { getMovieDetail } from '@/services/tmdb'
import { ApiError, NetworkError } from '@/types/errors'
import type { MovieDetail } from '@/services/tmdb'

export function useMovieDetail(id: number) {
  const movie = ref<MovieDetail | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  function handleError(e: unknown): void {
    if (e instanceof NetworkError) {
      error.value = 'Network error — check your connection.'
    } else if (e instanceof ApiError) {
      error.value = e.statusCode === 404 ? 'Movie not found.' : 'Failed to load movie details.'
    } else {
      error.value = 'Something went wrong.'
    }
  }

  onMounted(async () => {
    isLoading.value = true
    try {
      movie.value = await getMovieDetail(id)
    } catch (e) {
      handleError(e)
    } finally {
      isLoading.value = false
    }
  })

  return { movie, isLoading, error }
}
