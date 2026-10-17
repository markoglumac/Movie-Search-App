<template>
  <div class="skeleton-card" aria-hidden="true">
    <div class="skeleton-poster"></div>
    <div class="skeleton-meta"></div>
    <div class="skeleton-title"></div>
  </div>
</template>

<style scoped lang="scss">
@keyframes flicker {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

%skeleton-base {
  background: $bg-secondary;
  animation: flicker 1.6s ease-in-out infinite;
}

.skeleton-poster {
  @extend %skeleton-base;
  width: 100%;
  aspect-ratio: 2/3;
  outline: 1px solid $border;
  outline-offset: -1px;
}

.skeleton-meta {
  @extend %skeleton-base;
  height: 10px;
  width: 45%;
  margin-top: 12px;
}

.skeleton-title {
  @extend %skeleton-base;
  height: 16px;
  width: 80%;
  margin-top: 8px;
}
</style>
