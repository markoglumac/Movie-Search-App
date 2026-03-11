import { ref, onMounted } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { searchMovies, getTrending } from '@/services/tmdb'
import { ApiError, NetworkError } from '@/types/errors'
import type { Movie } from '@/services/tmdb'

export function useMovies() {
  const query = ref('')
  const movies = ref<Movie[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isSearching = ref(false)
  const currentPage = ref(1)
  const totalPages = ref(1)

  function handleError(e: unknown, fallback: string): void {
    if (e instanceof NetworkError) {
      error.value = 'Network error — check your connection.'
    } else if (e instanceof ApiError) {
      error.value =
        e.statusCode === 401
          ? 'Invalid API key.'
          : e.statusCode === 404
            ? 'Resource not found.'
            : fallback
    } else {
      error.value = fallback
    }
  }

  async function fetchTrending(page = 1) {
    isLoading.value = true
    error.value = null
    try {
      const data = await getTrending(page)
      console.log('total_pages:', data.total_pages, 'total_results:', data.total_results)

      movies.value = data.results
      totalPages.value = data.total_pages
      currentPage.value = page
    } catch (e) {
      handleError(e, 'Failed to load trending movies.')
    } finally {
      isLoading.value = false
    }
  }

  async function fetchSearch(q: string, page = 1) {
    isLoading.value = true
    error.value = null
    try {
      const data = await searchMovies(q, page)
      movies.value = data.results
      totalPages.value = data.total_pages
      currentPage.value = page
    } catch (e) {
      handleError(e, 'Search failed. Please try again.')
    } finally {
      isLoading.value = false
    }
  }

  function onPageChange(page: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (isSearching.value) {
      fetchSearch(query.value, page)
    } else {
      fetchTrending(page)
    }
  }

  watchDebounced(
    query,
    (newQuery) => {
      if (newQuery.trim() === '') {
        isSearching.value = false
        fetchTrending(1)
        return
      }
      isSearching.value = true
      fetchSearch(newQuery.trim(), 1)
    },
    { debounce: 400, maxWait: 1000 },
  )

  onMounted(() => {
    fetchTrending(1)
  })

  return { query, movies, isLoading, error, isSearching, currentPage, totalPages, onPageChange }
}
