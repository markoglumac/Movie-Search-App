<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <main class="not-found">
    <p class="kicker">Error 404</p>
    <h1 class="code">Reel<br /><em>missing.</em></h1>
    <p class="subtitle">This page was cut in the edit, or it never made it to the final print.</p>
    <div class="actions">
      <button class="btn-primary" @click="router.push('/')">Go home</button>
      <button class="btn-secondary" @click="router.back()">← Go back</button>
    </div>
  </main>
</template>

<style scoped lang="scss">
.not-found {
  @include container;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 64px;
  padding-bottom: 64px;
}

.kicker {
  @include label;
  color: $accent;
  margin-bottom: 20px;
}

.code {
  font-family: $font-display;
  font-size: clamp(64px, 13vw, 160px);
  font-weight: 300;
  line-height: 0.9;
  letter-spacing: -0.04em;
  font-variation-settings: 'opsz' 144;
  margin-bottom: 32px;

  em {
    color: $accent;
  }
}

.subtitle {
  max-width: 44ch;
  font-size: $font-size-xl;
  color: $text-secondary;
  margin-bottom: 40px;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary {
  @include button-solid;
}

.btn-secondary {
  @include button-outline;
}
</style>
