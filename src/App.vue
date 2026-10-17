<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <header class="masthead">
    <div class="masthead-inner">
      <RouterLink to="/" class="brand">Movie<em>Search</em></RouterLink>
      <nav class="nav">
        <RouterLink to="/" class="nav-link">Index</RouterLink>
        <RouterLink to="/favorites" class="nav-link">
          Favorites <span class="count">{{ String(favoritesStore.count).padStart(2, '0') }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
  <footer class="footer">
    <div class="footer-inner">
      <span>Data from TMDB</span>
      <span>Marko Glumac</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.masthead {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba($bg-primary, 0.92);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid $border;
}

.masthead-inner {
  @include container;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 18px;
  padding-bottom: 14px;
}

.brand {
  font-family: $font-display;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-decoration: none;
  color: $text-primary;

  em {
    font-weight: 400;
    color: $accent;
  }

  @include screenSize480 {
    font-size: 22px;
  }
}

.nav {
  display: flex;
  gap: 28px;

  @include screenSize480 {
    gap: 16px;
  }
}

.nav-link {
  @include label;
  color: $text-secondary;
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition:
    color 0.15s,
    border-color 0.15s;

  &:hover {
    color: $text-primary;
  }

  &.router-link-exact-active {
    color: $text-primary;
    border-bottom-color: $accent;
  }

  .count {
    color: $accent;
  }
}

.footer {
  border-top: 1px solid $border;
  margin-top: 64px;
}

.footer-inner {
  @include container;
  @include label;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 28px;
  color: $text-muted;
}
</style>
