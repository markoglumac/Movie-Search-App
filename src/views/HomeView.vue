<script setup lang="ts">
import { useMovies } from '@/composables/useMovies'
import MovieGrid from '@/components/MovieGrid.vue'
import PaginationBar from '@/components/PaginationBar.vue'

const { query, movies, isLoading, error, isSearching, currentPage, totalPages, onPageChange } =
  useMovies()

const today = new Date().toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})
</script>

<template>
  <main class="home">
    <section class="hero">
      <div class="kicker">
        <span>Programme</span>
        <span class="rule"></span>
        <span>{{ today }}</span>
      </div>
      <h1 class="headline">What are we<br /><em>watching</em> tonight?</h1>
      <label class="search">
        <span class="search-label">Search by title</span>
        <input
          v-model="query"
          class="search-input"
          type="search"
          placeholder="e.g. Paris, Texas"
          autocomplete="off"
          autofocus
        />
      </label>
    </section>

    <div class="content">
      <p v-if="error" class="status error">{{ error }}</p>
      <MovieGrid
        v-else
        :movies="movies"
        :loading="isLoading"
        :skeleton-count="10"
        :numbered="!isSearching"
        :title="isSearching ? `Results for “${query.trim()}”` : 'Trending this week'"
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
.hero {
  @include container;
  padding-top: 72px;
  padding-bottom: 64px;

  @include screenSize768 {
    padding-top: 48px;
    padding-bottom: 44px;
  }
}

.kicker {
  @include label;
  display: flex;
  align-items: center;
  gap: 14px;
  color: $text-muted;
  margin-bottom: 28px;

  .rule {
    flex: 1;
    height: 1px;
    background: $border-muted;
  }
}

.headline {
  font-family: $font-display;
  font-size: clamp(44px, 8vw, 104px);
  font-weight: 300;
  line-height: 0.95;
  letter-spacing: -0.035em;
  font-variation-settings: 'opsz' 144;
  margin-bottom: 48px;

  em {
    font-weight: 400;
    color: $accent;
  }
}

.search {
  display: block;
  max-width: 720px;
}

.search-label {
  @include label;
  display: block;
  color: $text-secondary;
  margin-bottom: 6px;
}

.search-input {
  width: 100%;
  padding: 8px 0 12px;
  border: none;
  border-bottom: 1px solid $text-secondary;
  border-radius: 0;
  background: transparent;
  font-family: $font-display;
  font-size: clamp(22px, 3.4vw, 34px);
  font-weight: 400;
  color: $text-primary;
  outline: none;
  transition: border-color 0.15s;

  &::placeholder {
    font-style: italic;
    color: $text-muted;
  }

  &:focus {
    border-bottom-color: $accent;
  }

  &::-webkit-search-cancel-button {
    filter: grayscale(1) brightness(1.6);
  }
}

.content {
  @include container;
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
