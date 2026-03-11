<script setup lang="ts">
import type { Movie } from '@/services/tmdb'
import MovieCard from './MovieCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'

defineProps<{
  movies: Movie[]
  title?: string
  loading?: boolean
  skeletonCount?: number
}>()
</script>

<template>
  <section class="movie-grid-section">
    <h2 v-if="title" class="section-title">{{ title }}</h2>

    <div class="grid" v-if="loading">
      <SkeletonCard v-for="n in skeletonCount ?? 8" :key="n" />
    </div>

    <template v-else>
      <p v-if="movies.length === 0" class="empty">No movies found.</p>
      <div v-else class="grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </template>
  </section>
</template>

<style scoped lang="scss">
.section-title {
  color: $text-primary;
  font-size: $font-size-xl;
  margin-bottom: 16px;

  @include screenSize480 {
    font-size: $font-size-lg;
    margin-bottom: 12px;
  }
}

.empty {
  color: $text-muted;
  text-align: center;
  padding: 40px 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @include screenSize1024 {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  @include screenSize768 {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @include screenSize480 {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
