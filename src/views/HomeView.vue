<script setup lang="ts">
import { useMovies } from '@/composables/useMovies'
import MovieGrid from '@/components/MovieGrid.vue'
import PaginationBar from '@/components/PaginationBar.vue'

const { query, movies, isLoading, error, isSearching, currentPage, totalPages, onPageChange } =
  useMovies()
</script>

<template>
  <main class="home">
    <div class="hero">
      <h1 class="app-title">🎬 MovieSearch</h1>
      <p class="subtitle">Find your next favorite film</p>
      <input
        v-model="query"
        class="search-input"
        type="text"
        placeholder="Search for a movie..."
        autofocus
      />
    </div>

    <div class="content">
      <p v-if="error" class="status error">{{ error }}</p>
      <MovieGrid
        v-else
        :movies="movies"
        :loading="isLoading"
        :skeleton-count="12"
        :title="isSearching ? `Results for &quot;${query}&quot;` : '🔥 Trending This Week'"
      />
      <PaginationBar
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="onPageChange"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  background: $bg-primary;
  color: $text-primary;
}

.hero {
  text-align: center;
  padding: 60px 20px 40px;
  background: linear-gradient(180deg, $bg-secondary 0%, $bg-primary 100%);

  @include screenSize768 {
    padding: 40px 16px 32px;
  }

  @include screenSize480 {
    padding: 28px 12px 24px;
  }

  .app-title {
    font-size: $font-size-3xl;
    font-weight: 800;
    margin-bottom: 8px;

    @include screenSize768 {
      font-size: $font-size-2xl;
    }

    @include screenSize480 {
      font-size: $font-size-xl;
    }
  }

  .subtitle {
    color: $text-secondary;
    margin-bottom: 28px;

    @include screenSize480 {
      font-size: $font-size-sm;
      margin-bottom: 20px;
    }
  }

  .search-input {
    width: 100%;
    max-width: 520px;
    padding: 14px 20px;
    border-radius: 30px;
    border: 2px solid #333;
    background: $bg-secondary;
    color: $text-primary;
    font-size: $font-size-lg;
    outline: none;
    transition: border-color 0.2s;

    @include screenSize768 {
      max-width: 80%;
      padding: 12px 16px;
    }

    @include screenSize480 {
      font-size: $font-size-md;
      padding: 10px 14px;
    }

    &:focus {
      border-color: $accent;
    }
  }
}

.content {
  padding: 32px 24px;
  max-width: 1200px;
  margin: 0 auto;

  @include screenSize768 {
    padding: 24px 16px;
  }

  @include screenSize480 {
    padding: 16px 12px;
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
