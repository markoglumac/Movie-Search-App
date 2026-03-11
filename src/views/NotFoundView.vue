<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <main class="not-found">
    <div class="content">
      <h1 class="code">404</h1>
      <p class="title">Page not found</p>
      <p class="subtitle">The page you're looking for doesn't exist or has been moved.</p>
      <div class="actions">
        <button class="btn-primary" @click="router.push('/')">Go Home</button>
        <button class="btn-secondary" @click="router.back()">Go Back</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.not-found {
  min-height: 100vh;
  background: $bg-primary;
  color: $text-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;

  .content {
    .code {
      font-size: 120px;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 16px;
      background: linear-gradient(135deg, $accent, #a89fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      @include screenSize480 {
        font-size: 80px;
      }
    }

    .title {
      font-size: $font-size-2xl;
      font-weight: 800;
      margin-bottom: 12px;

      @include screenSize480 {
        font-size: $font-size-xl;
      }
    }

    .subtitle {
      color: $text-secondary;
      font-size: $font-size-lg;
      margin-bottom: 40px;

      @include screenSize480 {
        font-size: $font-size-md;
        margin-bottom: 28px;
      }
    }

    .actions {
      display: flex;
      gap: 16px;
      justify-content: center;

      @include screenSize480 {
        flex-direction: column;
        align-items: center;
      }
    }

    .btn-primary {
      background: $accent;
      border: none;
      color: $text-primary;
      padding: 12px 28px;
      border-radius: $radius-lg;
      font-size: $font-size-md;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: $accent-hover;
      }

      @include screenSize480 {
        width: 100%;
      }
    }

    .btn-secondary {
      background: transparent;
      border: 1px solid $border-muted;
      color: $text-secondary;
      padding: 12px 28px;
      border-radius: $radius-lg;
      font-size: $font-size-md;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: $text-primary;
        color: $text-primary;
      }

      @include screenSize480 {
        width: 100%;
      }
    }
  }
}
</style>
