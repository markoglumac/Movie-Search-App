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
  <nav class="pagination" v-if="totalPages > 1" aria-label="Pagination">
    <button
      class="page-btn arrow"
      :disabled="currentPage === 1"
      @click="emit('page-change', currentPage - 1)"
    >
      ← Prev
    </button>
    <div class="pages">
      <template v-for="(page, i) in getPages()" :key="`${page}-${i}`">
        <span v-if="page === '...'" class="ellipsis">…</span>
        <button
          v-else
          class="page-btn"
          :class="{ active: page === currentPage }"
          :aria-current="page === currentPage ? 'page' : undefined"
          @click="emit('page-change', page)"
        >
          {{ String(page).padStart(2, '0') }}
        </button>
      </template>
    </div>
    <button
      class="page-btn arrow"
      :disabled="currentPage === Math.min(totalPages, 500)"
      @click="emit('page-change', currentPage + 1)"
    >
      Next →
    </button>
  </nav>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 56px;
  padding-top: 20px;
  border-top: 1px solid $border-muted;

  @include screenSize480 {
    flex-wrap: wrap;
    justify-content: center;
  }
}

.pages {
  display: flex;
  align-items: center;
  gap: 4px;

  @include screenSize480 {
    order: -1;
    width: 100%;
    justify-content: center;
  }
}

.page-btn {
  @include label;
  min-width: 34px;
  padding: 8px 6px;
  border: none;
  border-bottom: 1px solid transparent;
  background: none;
  color: $text-secondary;
  cursor: pointer;
  transition:
    color 0.15s,
    border-color 0.15s;

  &:hover:not(:disabled) {
    color: $text-primary;
  }

  &.active {
    color: $accent;
    border-bottom-color: $accent;
  }

  &:disabled {
    color: $text-muted;
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.arrow {
    padding: 8px 0;
  }
}

.ellipsis {
  @include label;
  color: $text-muted;
  padding: 0 4px;
  user-select: none;
}
</style>
