<script setup lang="ts">
import { computed } from 'vue'
import type { Movie } from '@/services/tmdb'
import { getPosterUrl } from '@/services/tmdb'
import { useFavoritesStore } from '@/stores/favorites'
import { useRouter } from 'vue-router'

const props = defineProps<{ movie: Movie }>()

const router = useRouter()
const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => favoritesStore.isFavorite(props.movie.id))

const year = computed(() => {
  props.movie.release_date?.slice(0, 4) ?? 'N/A'
})
const rating = computed(() => {
  return props.movie.vote_average.toFixed(1) + ' rating'
})

function goToDetail() {
  router.push(`/movie/${props.movie.id}`)
}

function toggleFavorite(e: MouseEvent) {
  e.stopPropagation() // prevent triggering goToDetail()
  favoritesStore.toggleFavorite(props.movie)
}
</script>

<template>
  <div class="movie-card" @click="goToDetail">
    <div class="poster-wrapper">
      <img :src="getPosterUrl(movie.poster_path)" :alt="movie.title" , class="poster" />
      <button
        class="favorite-btn"
        :class="{ active: isFavorite }"
        @click="toggleFavorite"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
      <div class="rating">{{ rating }}</div>
    </div>
    <div class="info">
      <h3 class="title">{{ movie.title }}</h3>
      <span class="year">{{ year }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.movie-card {
  cursor: pointer;
  border-radius: $radius-sm;
  overflow: hidden;
  background: $bg-card;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  @include screenSize480 {
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  .poster-wrapper {
    position: relative;

    .poster {
      width: 100%;
      aspect-ratio: 2/3;
      object-fit: cover;
      display: block;
    }

    .favorite-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(0, 0, 0, 0.6);
      border: none;
      border-radius: $radius-full;
      width: 36px;
      height: 36px;
      font-size: $font-size-lg;
      cursor: pointer;
      transition: transform 0.15s ease;

      @include screenSize480 {
        width: 28px;
        height: 28px;
        font-size: $font-size-sm;
        top: 4px;
        right: 4px;
      }

      &:hover {
        transform: scale(1.2);
      }
    }

    .rating {
      position: absolute;
      bottom: 8px;
      left: 8px;
      background: rgba(0, 0, 0, 0.7);
      color: $text-primary;
      font-size: $font-size-sm;
      padding: 2px 8px;
      border-radius: $radius-md;

      @include screenSize480 {
        font-size: 10px;
        padding: 2px 6px;
        bottom: 4px;
        left: 4px;
      }
    }
  }

  .info {
    padding: 10px 12px;

    @include screenSize480 {
      padding: 6px 8px;
    }

    .title {
      font-size: $font-size-md;
      font-weight: 600;
      color: $text-primary;
      margin: 0 0 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @include screenSize480 {
        font-size: $font-size-sm;
      }
    }

    .year {
      font-size: $font-size-sm;
      color: $text-muted;

      @include screenSize480 {
        font-size: 10px;
      }
    }
  }
}
</style>
