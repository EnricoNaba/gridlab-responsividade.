<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import ViewportBadge from '@/components/layout/ViewportBadge.vue'
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <div class="brand-code">GRIDLAB_ENGINEERING_NOTEBOOK</div>
          <p>Guia Interativo de Responsividade • Desenvolvimento Web Front-End</p>
        </div>
        <div class="footer-meta">
          <span>Identidade Visual Técnica // Mobile-First</span>
          <span>Arquitetura Vue 3 + Pinia + Vue Router</span>
        </div>
      </div>
    </footer>
    <ViewportBadge />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;
  padding-block: var(--space-md);
  position: relative;
}

/* Transições fluidas de página (sem flashes ou telas em branco) */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.site-footer {
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
  padding-block: var(--space-lg);
  padding-bottom: 4.5rem; /* Espaço para o ViewportBadge fixo no mobile */
  margin-top: var(--space-xl);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
.footer-inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
.brand-code {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: 0.05em;
  font-size: var(--text-sm);
}
.footer-brand p {
  margin: var(--space-xs) 0 0;
  color: var(--color-text);
}
.footer-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

@media (min-width: 48rem) {
  .main-content {
    padding-block: var(--space-xl);
  }
  .site-footer {
    padding-bottom: var(--space-lg);
  }
  .footer-inner {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .footer-meta {
    text-align: right;
  }
}
</style>
