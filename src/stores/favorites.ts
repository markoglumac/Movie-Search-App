import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Movie } from '@/services/tmdb'

export const useFavoritesStore = defineStore('favorites', () => {
  // --- State ---
  const favorites = ref<Movie[]>(loadFromStorage())

  // --- Getters ---
  const count = computed(() => {
    favorites.value.length
  })

  function isFavorite(id: number): boolean {
    return favorites.value.some((m) => m.id === id)
  }

  // --- Actions ---
  function toggleFavorite(movie: Movie) {
    if (isFavorite(movie.id)) {
      favorites.value = favorites.value.filter((m) => m.id !== movie.id)
    } else {
      favorites.value.push(movie)
    }
    saveToStorage()
  }

  // --- Persistence ---
  function saveToStorage() {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  function loadFromStorage(): Movie[] {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  }

  return { favorites, count, isFavorite, toggleFavorite }
})
