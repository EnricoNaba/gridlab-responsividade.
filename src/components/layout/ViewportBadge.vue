<!-- src/components/layout/ViewportBadge.vue (incluir no App.vue) -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1024);
const updateWidth = () => {
  width.value = window.innerWidth;
};

onMounted(() => window.addEventListener('resize', updateWidth));
onUnmounted(() => window.removeEventListener('resize', updateWidth));

const breakpoint = computed(() => {
  if (width.value < 640) return 'xs (< 40rem • Mobile)';
  if (width.value < 768) return 'sm (≥ 40rem • Tablet P)';
  if (width.value < 1024) return 'md (≥ 48rem • Tablet G)';
  return 'lg (≥ 64rem • Desktop)';
});
</script>

<template>
  <aside class="viewport-badge" aria-live="polite" title="Lab 1: Monitor de Viewport e Breakpoint em tempo real">
    <div class="badge-header">
      <span class="indicator-dot"></span>
      <span class="badge-label">LAB 1 • VIEWPORT</span>
    </div>
    <div class="badge-body">
      <span class="badge-width">{{ width }}px</span>
      <span class="badge-bp">{{ breakpoint }}</span>
    </div>
  </aside>
</template>

<style scoped>
.viewport-badge {
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  z-index: 50;
  background: var(--color-surface);
  border: 1px solid var(--color-accent);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-sm);
  padding: 0.3rem 0.5rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  pointer-events: auto;
  user-select: none;
  max-width: calc(100vw - 1rem);
}
.badge-header {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-success);
  display: inline-block;
}
.badge-label {
  display: none;
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}
.badge-body {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}
.badge-width {
  font-weight: 700;
  color: var(--color-accent);
  font-size: 0.85rem;
}
.badge-bp {
  color: var(--color-text-muted);
  font-size: 0.7rem;
}

@media (min-width: 30rem) {
  .viewport-badge {
    bottom: 0.75rem;
    right: 0.75rem;
    padding: 0.4rem 0.65rem;
  }
  .badge-label {
    display: inline;
  }
}
</style>
