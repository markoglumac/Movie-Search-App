<script setup lang="ts">
import { computed } from 'vue'
import type { Movie } from '@/services/tmdb'
import { getPosterUrl } from '@/services/tmdb'
import { useFavoritesStore } from '@/stores/favorites'
import { useRouter } from 'vue-router'

const props = defineProps<{ movie: Movie; index?: number }>()

const router = useRouter()
const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => favoritesStore.isFavorite(props.movie.id))

const year = computed(() => props.movie.release_date?.slice(0, 4) || '—')
const rating = computed(() =>
  props.movie.vote_average ? props.movie.vote_average.toFixed(1) : '–',
)
const number = computed(() =>
  props.index !== undefined ? String(props.index + 1).padStart(2, '0') : null,
)

function goToDetail() {
  router.push(`/movie/${props.movie.id}`)
}

function toggleFavorite(e: MouseEvent) {
  e.stopPropagation() // prevent triggering goToDetail()
  favoritesStore.toggleFavorite(props.movie)
}
</script>

<template>
  <article
    class="movie-card"
    role="link"
    tabindex="0"
    @click="goToDetail"
    @keydown.enter="goToDetail"
  >
    <div class="poster-wrapper">
      <img
        v-if="movie.poster_path"
        :src="getPosterUrl(movie.poster_path)"
        :alt="movie.title"
        class="poster"
        loading="lazy"
      />
      <div v-else class="poster poster-empty">
        <span>{{ movie.title }}</span>
      </div>
      <button
        class="favorite-btn"
        :class="{ active: isFavorite }"
        @click="toggleFavorite"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        :aria-pressed="isFavorite"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M6 3h12v18l-6-4.5L6 21z" />
        </svg>
      </button>
    </div>
    <div class="info">
      <div class="meta">
        <span v-if="number" class="number">{{ number }}</span>
        <span>{{ year }}</span>
        <span class="rating">{{ rating }}</span>
      </div>
      <h3 class="title">{{ movie.title }}</h3>
    </div>
  </article>
</template>

<style scoped lang="scss">
.movie-card {
  cursor: pointer;
  outline: none;

  &:hover,
  &:focus-visible {
    .poster {
      filter: none;
      outline-color: $accent;
    }

    .title {
      color: $accent;
    }
  }

  &:focus-visible .poster {
    outline-width: 2px;
  }
}

.poster-wrapper {
  position: relative;
}

.poster {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  background: $bg-secondary;
  outline: 1px solid $border;
  outline-offset: -1px;
  filter: saturate(0.85) contrast(1.02);
  transition:
    filter 0.25s,
    outline-color 0.15s;
}

.poster-empty {
  display: flex;
  align-items: flex-end;
  padding: 14px;
  font-family: $font-display;
  font-style: italic;
  font-size: $font-size-xl;
  line-height: 1.15;
  color: $text-muted;
  background:
    repeating-linear-gradient(-45deg, transparent 0 10px, rgba($text-primary, 0.025) 10px 11px),
    $bg-secondary;
}

.favorite-btn {
  position: absolute;
  top: 0;
  right: 10px;
  width: 30px;
  height: 38px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
  border: none;
  border-radius: 0 0 $radius-sm $radius-sm;
  background: rgba($bg-primary, 0.85);
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 0.15s,
    background 0.15s;

  svg {
    fill: none;
    stroke: $text-primary;
    stroke-width: 1.6;
  }

  .movie-card:hover &,
  .movie-card:focus-within &,
  &.active {
    opacity: 1;
  }

  &.active {
    background: $accent;

    svg {
      fill: $bg-primary;
      stroke: $bg-primary;
    }
  }

  // touch screens have no hover
  @media (hover: none) {
    opacity: 1;
  }
}

.info {
  padding-top: 10px;
}

.meta {
  @include label;
  display: flex;
  gap: 10px;
  color: $text-muted;
  margin-bottom: 4px;

  .number {
    color: $accent;
  }

  .rating {
    margin-left: auto;
    color: $text-secondary;
  }
}

.title {
  font-family: $font-display;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: $text-primary;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.15s;

  @include screenSize480 {
    font-size: 15px;
  }
}
</style>
