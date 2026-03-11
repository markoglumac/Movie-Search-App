<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'
import MovieGrid from '@/components/MovieGrid.vue'
import { useRouter } from 'vue-router'

const favoritesStore = useFavoritesStore()
const router = useRouter()
</script>

<template>
  <main class="favorites-page">
    <button class="back-btn" @click="router.back()">← Back</button>
    <h1 class="page-title">❤️ My Favorites</h1>

    <div v-if="favoritesStore.count! === 0" class="empty">
      <p>You haven't added any favorites yes.</p>
      <button class="browse-btn" @click="router.push('/')">Browse Movies</button>
    </div>

    <MovieGrid v-else :movies="favoritesStore.favorites" />
  </main>
</template>

<style scoped lang="scss">
.favorites-page {
  min-height: 100vh;
  background: $bg-primary;
  color: $text-primary;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @include screenSize768 {
    padding: 16px;
  }

  @include screenSize480 {
    padding: 12px;
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

.page-title {
  font-size: $font-size-2xl;
  font-weight: 800;
  margin-bottom: 32px;

  @include screenSize768 {
    font-size: $font-size-xl;
    margin-bottom: 24px;
  }

  @include screenSize480 {
    font-size: $font-size-lg;
    margin-bottom: 16px;
  }
}

.empty {
  text-align: center;
  padding: 80px 0;
  color: $text-secondary;

  @include screenSize480 {
    padding: 48px 0;
  }

  p {
    margin-bottom: 20px;
    font-size: $font-size-lg;

    @include screenSize480 {
      font-size: $font-size-md;
    }
  }
}

.browse-btn {
  background: $accent;
  border: none;
  color: $text-primary;
  padding: 12px 28px;
  border-radius: $radius-lg;
  font-size: $font-size-md;
  cursor: pointer;
  transition: background 0.2s;

  @include screenSize480 {
    width: 100%;
    padding: 12px;
  }

  &:hover {
    background: $accent-hover;
  }
}
</style>
