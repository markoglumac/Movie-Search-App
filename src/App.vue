<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/" class="nav-brand">🎬 MovieSearch</RouterLink>
    <RouterLink to="/favorites" class="nav-link">❤️ Favorites</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: $bg-secondary;
  border-bottom: 1px solid $border;

  @include screenSize480 {
    padding: 12px 16px;
  }

  .nav-brand {
    font-size: $font-size-xl;
    font-weight: 800;
    color: $text-primary;
    text-decoration: none;

    @include screenSize480 {
      font-size: $font-size-lg;
    }
  }

  .nav-link {
    color: $text-secondary;
    text-decoration: none;
    font-size: 15px;
    transition: color 0.2s;

    @include screenSize480 {
      font-size: $font-size-sm;
    }

    &:hover {
      color: $text-primary;
    }
  }
}
</style>
