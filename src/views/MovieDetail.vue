<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPosterUrl, getBackdropUrl } from '@/services/tmdb'
import { useFavoritesStore } from '@/stores/favorites'
import { useMovieDetail } from '@/composables/useMovieDetail'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()

const { movie, isLoading, error } = useMovieDetail(Number(route.params.id))

const isFavorite = computed(() => (movie.value ? favoritesStore.isFavorite(movie.value.id) : false))

const backdrop = computed(() => getBackdropUrl(movie.value?.backdrop_path ?? null))

const year = computed(() => movie.value?.release_date?.slice(0, 4) || '—')

const runtime = computed(() => {
  const mins = movie.value?.runtime
  if (!mins) return null
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`
})

const rating = computed(() =>
  movie.value?.vote_average ? movie.value.vote_average.toFixed(1) : '–',
)
</script>

<template>
  <main class="detail-page">
    <div
      v-if="backdrop"
      class="backdrop"
      :style="{ backgroundImage: `url(${backdrop})` }"
      aria-hidden="true"
    ></div>

    <div class="detail-inner">
      <button class="back-btn" @click="router.back()">← Back</button>

      <p v-if="isLoading" class="status">Threading the projector…</p>
      <p v-else-if="error" class="status error">{{ error }}</p>

      <article v-else-if="movie" class="detail">
        <div class="poster-col">
          <img
            v-if="movie.poster_path"
            :src="getPosterUrl(movie.poster_path)"
            :alt="movie.title"
            class="poster"
          />
          <div v-else class="poster poster-empty">No poster</div>
          <button
            class="favorite-btn"
            :class="{ active: isFavorite }"
            @click="favoritesStore.toggleFavorite(movie!)"
            :aria-pressed="isFavorite"
          >
            {{ isFavorite ? '✓ Saved to favorites' : '+ Add to favorites' }}
          </button>
        </div>

        <div class="info-col">
          <p class="kicker">{{ year }}<template v-if="runtime"> · {{ runtime }}</template></p>
          <h1 class="title">{{ movie.title }}</h1>
          <p v-if="movie.tagline" class="tagline">{{ movie.tagline }}</p>

          <dl class="facts">
            <div>
              <dt>Rating</dt>
              <dd><span class="big">{{ rating }}</span> / 10</dd>
            </div>
            <div>
              <dt>Released</dt>
              <dd>{{ movie.release_date || '—' }}</dd>
            </div>
            <div v-if="runtime">
              <dt>Runtime</dt>
              <dd>{{ runtime }}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{{ movie.status }}</dd>
            </div>
          </dl>

          <ul v-if="movie.genres.length" class="genres">
            <li v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</li>
          </ul>

          <p v-if="movie.overview" class="overview">{{ movie.overview }}</p>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped lang="scss">
.detail-page {
  position: relative;
}

.backdrop {
  position: absolute;
  inset: 0 0 auto;
  height: 520px;
  background-size: cover;
  background-position: center 20%;
  opacity: 0.22;
  filter: grayscale(0.6);
  mask-image: linear-gradient(to bottom, #000 0%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 100%);
  pointer-events: none;
}

.detail-inner {
  @include container;
  position: relative;
  padding-top: 32px;
}

.back-btn {
  @include label;
  background: none;
  border: none;
  padding: 0;
  color: $text-secondary;
  cursor: pointer;
  margin-bottom: 48px;
  transition: color 0.15s;

  &:hover {
    color: $accent;
  }

  @include screenSize480 {
    margin-bottom: 28px;
  }
}

.detail {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 56px;
  align-items: start;

  @include screenSize768 {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.poster-col {
  @include screenSize768 {
    max-width: 280px;
  }
}

.poster {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  outline: 1px solid $border-muted;
  outline-offset: -1px;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.8);
}

.poster-empty {
  @include label;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $bg-secondary;
  color: $text-muted;
}

.favorite-btn {
  @include button-outline;
  width: 100%;
  margin-top: 16px;

  &.active {
    background: $accent;
    border-color: $accent;
    color: $bg-primary;
  }
}

.kicker {
  @include label;
  color: $accent;
  margin-bottom: 14px;
}

.title {
  font-family: $font-display;
  font-size: clamp(40px, 6.5vw, 80px);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.03em;
  font-variation-settings: 'opsz' 144;
  margin-bottom: 18px;
}

.tagline {
  font-family: $font-display;
  font-style: italic;
  font-size: $font-size-xl;
  color: $text-secondary;
  margin-bottom: 36px;
}

.facts {
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: start;
  gap: 0;
  margin: 0 0 28px;
  border-top: 1px solid $border-muted;
  border-bottom: 1px solid $border-muted;

  @include screenSize480 {
    grid-template-columns: repeat(2, 1fr);
  }

  > div {
    padding: 14px 32px 14px 0;
    margin-right: 32px;
    border-right: 1px solid $border;

    &:last-child {
      border-right: none;
      margin-right: 0;
    }

    @include screenSize480 {
      margin-right: 0;
      padding-right: 12px;
      border-right: none;
    }
  }

  dt {
    @include label;
    color: $text-muted;
    margin-bottom: 4px;
  }

  dd {
    margin: 0;
    font-family: $font-mono;
    font-size: $font-size-md;
    color: $text-primary;
  }

  .big {
    font-family: $font-display;
    font-size: 24px;
    line-height: 1;
  }
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0 0 32px;

  li {
    @include label;
    padding: 5px 10px;
    border: 1px solid $border-muted;
    color: $text-secondary;
  }
}

.overview {
  max-width: 62ch;
  font-size: 19px;
  line-height: 1.65;
  color: $text-primary;
  font-weight: 300;

  &::first-letter {
    float: left;
    font-size: 3.4em;
    line-height: 0.85;
    padding: 6px 10px 0 0;
    font-weight: 500;
    color: $accent;
  }

  @include screenSize480 {
    font-size: 17px;
  }
}

.status {
  font-family: $font-display;
  font-style: italic;
  font-size: $font-size-xl;
  color: $text-secondary;
  padding: 48px 0;

  &.error {
    color: $error;
  }
}
</style>
