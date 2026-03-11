<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPosterUrl } from '@/services/tmdb'
import { useFavoritesStore } from '@/stores/favorites'
import { useMovieDetail } from '@/composables/useMovieDetail'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()

const { movie, isLoading, error } = useMovieDetail(Number(route.params.id))

const isFavorite = computed(() => (movie.value ? favoritesStore.isFavorite(movie.value.id) : false))

const rating = computed(() => {
  return movie.value?.vote_average.toFixed(1) + ' rating'
})
</script>

<template>
  <main class="detail-page">
    <button class="back-btn" @click="router.back()">← Back</button>

    <p v-if="isLoading" class="status">Loading...</p>
    <p v-else-if="error" class="status error">{{ error }}</p>

    <div v-else-if="movie" class="detail">
      <div class="poster-col">
        <img :src="getPosterUrl(movie.poster_path)" :alt="movie.title" class="poster" />
        <button
          class="favorite-btn"
          :class="{ active: isFavorite }"
          @click="favoritesStore.toggleFavorite(movie!)"
          :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        >
          {{ isFavorite ? '❤️' : '🤍' }}
        </button>
      </div>

      <div class="info-col">
        <h1 class="title">{{ movie.title }}</h1>
        <p v-if="movie.tagline" class="tagline">{{ movie.tagline }}</p>

        <div class="meta">
          <span>{{ rating }}</span>
          <span>📅 {{ movie.release_date?.slice(0, 4) }}</span>
          <span v-if="movie.runtime">🕐 {{ movie.runtime }} min</span>
          <span>{{ movie.status }}</span>
        </div>

        <div class="genres">
          <span v-for="genre in movie.genres" :key="genre.id" class="genre-tag">
            {{ genre.name }}
          </span>
        </div>

        <p class="overview">{{ movie.overview }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.detail-page {
  min-height: 100vh;
  background: $bg-primary;
  color: $text-primary;
  padding: 24px;
  max-width: 1100px;
  margin: 0 auto;

  @include screenSize768 {
    padding: 16px;
  }
}

.back-btn {
  background: none;
  border: 1px solid $border-muted;
  color: $text-secondary;
  padding: 8px 16px;
  border-radius: $radius-lg;
  cursor: pointer;
  margin-bottom: 32px;
  transition: all 0.2s;

  @include screenSize480 {
    margin-bottom: 20px;
    padding: 6px 12px;
    font-size: $font-size-sm;
  }

  &:hover {
    border-color: $text-primary;
    color: $text-primary;
  }
}

.detail {
  display: flex;
  gap: 40px;

  @include screenSize768 {
    flex-direction: column;
    gap: 24px;
  }

  .poster-col {
    flex-shrink: 0;
    width: 280px;

    @include screenSize768 {
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }

    @include screenSize480 {
      max-width: 100%;
    }

    .poster {
      width: 100%;
      border-radius: $radius-md;
    }

    .favorite-btn {
      width: 100%;
      margin-top: 12px;
      padding: 12px;
      border-radius: $radius-sm;
      border: 2px solid $accent;
      background: transparent;
      color: $text-primary;
      font-size: $font-size-md;
      cursor: pointer;
      transition: background 0.2s;

      &.active,
      &:hover {
        background: $accent;
      }
    }
  }

  .info-col {
    .title {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 8px;

      @include screenSize768 {
        font-size: $font-size-2xl;
      }

      @include screenSize480 {
        font-size: $font-size-xl;
      }
    }

    .tagline {
      color: $text-secondary;
      font-style: italic;
      margin-bottom: 20px;

      @include screenSize480 {
        font-size: $font-size-sm;
        margin-bottom: 12px;
      }
    }

    .meta {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 20px;
      color: $text-secondary;
      font-size: $font-size-md;

      @include screenSize480 {
        gap: 10px;
        font-size: $font-size-sm;
        margin-bottom: 14px;
      }
    }

    .genres {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 24px;

      @include screenSize480 {
        gap: 6px;
        margin-bottom: 16px;
      }

      .genre-tag {
        background: $bg-secondary;
        border: 1px solid $accent;
        color: #a89fff;
        padding: 4px 12px;
        border-radius: $radius-lg;
        font-size: 13px;

        @include screenSize480 {
          font-size: $font-size-sm;
          padding: 3px 10px;
        }
      }
    }

    .overview {
      line-height: 1.8;
      color: $text-secondary;
      font-size: 15px;

      @include screenSize480 {
        font-size: $font-size-md;
        line-height: 1.6;
      }
    }
  }
}

.status {
  text-align: center;
  color: $text-secondary;
  padding: 60px 0;

  &.error {
    color: $error;
  }
}
</style>
