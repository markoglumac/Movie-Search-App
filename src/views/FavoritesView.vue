<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'
import MovieGrid from '@/components/MovieGrid.vue'
import { useRouter } from 'vue-router'

const favoritesStore = useFavoritesStore()
const router = useRouter()
</script>

<template>
  <main class="favorites-page">
    <header class="page-head">
      <p class="kicker">Your list · {{ favoritesStore.count }} saved</p>
      <h1 class="page-title">Favorites</h1>
    </header>

    <div v-if="favoritesStore.count === 0" class="empty">
      <p>Nothing saved yet.</p>
      <p class="hint">Tap the bookmark on any poster to keep it here.</p>
      <button class="browse-btn" @click="router.push('/')">Browse movies →</button>
    </div>

    <MovieGrid v-else :movies="favoritesStore.favorites" />
  </main>
</template>

<style scoped lang="scss">
.favorites-page {
  @include container;
}

.page-head {
  padding-top: 64px;
  padding-bottom: 40px;

  @include screenSize480 {
    padding-top: 40px;
    padding-bottom: 28px;
  }
}

.kicker {
  @include label;
  color: $accent;
  margin-bottom: 12px;
}

.page-title {
  font-family: $font-display;
  font-size: clamp(44px, 7vw, 88px);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.035em;
  font-variation-settings: 'opsz' 144;
  padding-bottom: 20px;
  border-bottom: 1px solid $border-muted;
}

.empty {
  padding: 24px 0 40px;

  p {
    font-family: $font-display;
    font-style: italic;
    font-size: $font-size-2xl;
    color: $text-primary;
  }

  .hint {
    font-style: normal;
    font-size: $font-size-lg;
    color: $text-secondary;
    margin: 8px 0 28px;
  }
}

.browse-btn {
  @include button-solid;
}
</style>
