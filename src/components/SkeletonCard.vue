<template>
  <div class="skeleton-card">
    <div class="skeleton-poster"></div>
    <div class="skeleton-info">
      <div class="skeleton-title"></div>
      <div class="skeleton-year"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}

%skeleton-base {
  background: linear-gradient(90deg, $bg-secondary 25%, #2a2a4a 50%, $bg-secondary 75%);
  background-size: 400px 100%;
  animation: shimmer 1.4s infinite linear;
  border-radius: $radius-sm;
}

.skeleton-card {
  border-radius: $radius-sm;
  overflow: hidden;
  background: $bg-card;

  .skeleton-poster {
    @extend %skeleton-base;
    width: 100%;
    aspect-ratio: 2/3;
  }

  .skeleton-info {
    padding: 10px 12px;

    @include screenSize480 {
      padding: 6px 8px;
    }

    .skeleton-title {
      @extend %skeleton-base;
      height: 14px;
      width: 80%;
      margin-bottom: 8px;
    }

    .skeleton-year {
      @extend %skeleton-base;
      height: 12px;
      width: 40%;
    }
  }
}
</style>
