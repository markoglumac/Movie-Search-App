<script setup lang="ts">
import type { Movie } from '@/services/tmdb'
import MovieCard from './MovieCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'

defineProps<{
  movies: Movie[]
  title?: string
  loading?: boolean
  skeletonCount?: number
  numbered?: boolean
}>()
</script>

<template>
  <section class="movie-grid-section">
    <header v-if="title" class="section-head">
      <h2 class="section-title">{{ title }}</h2>
      <span v-if="!loading && movies.length" class="section-count">
        {{ movies.length }} titles
      </span>
    </header>

    <div class="grid" v-if="loading">
      <SkeletonCard v-for="n in skeletonCount ?? 8" :key="n" />
    </div>

    <template v-else>
      <p v-if="movies.length === 0" class="empty">Nothing on the reel for that one.</p>
      <div v-else class="grid">
        <MovieCard
          v-for="(movie, i) in movies"
          :key="movie.id"
          :movie="movie"
          :index="numbered ? i : undefined"
        />
      </div>
    </template>
  </section>
</template>

<style scoped lang="scss">
.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 12px;
  margin-bottom: 28px;
  border-bottom: 1px solid $border-muted;
}

.section-title {
  font-family: $font-display;
  font-size: $font-size-2xl;
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.01em;
  color: $text-primary;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @include screenSize480 {
    font-size: 22px;
  }
}

.section-count {
  @include label;
  color: $text-muted;
  flex-shrink: 0;
}

.empty {
  font-family: $font-display;
  font-style: italic;
  font-size: $font-size-xl;
  color: $text-muted;
  padding: 64px 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px 24px;

  @include screenSize1024 {
    grid-template-columns: repeat(4, 1fr);
  }

  @include screenSize768 {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px 16px;
  }

  @include screenSize480 {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px 14px;
  }
}
</style>
