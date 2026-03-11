<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

function getPages(): (number | '...')[] {
  const total = Math.min(props.totalPages, 500)
  const current = props.currentPage
  const pages: (number | '...')[] = []

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  pages.push(1)

  if (current > 3) {
    pages.push('...')
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push('...')
  }

  pages.push(total)

  return pages
}
</script>

<template>
  <div class="pagination" v-if="totalPages > 1">
    <button
      class="page-btn arrow"
      :disabled="currentPage === 1"
      @click="emit('page-change', currentPage - 1)"
    >
      ←
    </button>
    <template v-for="page in getPages()" :key="page">
      <span v-if="page === '...'" class="ellipsis">...</span>
      <button
        v-else
        class="page-btn"
        :class="{ active: page === currentPage }"
        @click="emit('page-change', page)"
      >
        {{ page }}
      </button>
    </template>
    <button
      class="page-btn arrow"
      :disabled="currentPage === Math.min(totalPages, 500)"
      @click="emit('page-change', currentPage + 1)"
    >
      →
    </button>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 32px 0;
  flex-wrap: wrap;

  @include screenSize480 {
    gap: 4px;
    padding: 24px 0;
  }
}

.page-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  border-radius: $radius-sm;
  border: 1px solid $border-muted;
  background: transparent;
  color: $text-secondary;
  font-size: $font-size-md;
  cursor: pointer;
  transition: all 0.2s;

  @include screenSize480 {
    min-width: 30px;
    height: 30px;
    font-size: $font-size-sm;
  }

  &:hover:not(:disabled) {
    border-color: $accent;
    color: $text-primary;
  }

  &.active {
    background: $accent;
    border-color: $accent;
    color: $text-primary;
    font-weight: 600;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &.arrow {
    font-size: $font-size-lg;
  }
}

.ellipsis {
  color: $text-muted;
  padding: 0 4px;
  user-select: none;
}
</style>
