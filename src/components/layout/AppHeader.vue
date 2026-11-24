<!-- src/components/layout/AppHeader.vue -->
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useGuideStore } from '@/stores/useGuideStore';
import { isNavigating } from '@/router';

const menuOpen = ref(false);
const store = useGuideStore();

const links = [
  { to: '/importancia', label: '1. Importância' },
  { to: '/unidades', label: '2. Unidades' },
  { to: '/flexbox-grid', label: '3. Flex & Grid' },
  { to: '/imagens', label: '4. Imagens' },
  { to: '/boas-praticas', label: '5. Boas Práticas' },
  { to: '/desafio', label: 'Desafio Final' },
];
</script>

<template>
  <header class="site-header">
    <!-- Barra de progresso de transição no topo -->
    <div :class="['route-progress-bar', { 'is-active': isNavigating }]"></div>

    <div class="container header-inner">
      <div class="brand-group">
        <RouterLink to="/" class="brand" @click="menuOpen = false">
          GridLab<span class="brand-cursor">_</span>
        </RouterLink>
        <span class="progress-pill">{{ store.progressPercentage }}% lido</span>
      </div>

      <button
        class="menu-toggle"
        :aria-expanded="menuOpen"
        aria-label="Alternar menu de navegação"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'Fechar ✕' : 'Menu ☰' }}
      </button>

      <nav :class="['main-nav', { 'is-open': menuOpen }]">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 40;
}

/* Barra animada de carregamento de rota */
.route-progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: var(--color-accent);
  transition: width 0.25s ease, opacity 0.2s ease;
  opacity: 0;
  z-index: 50;
  box-shadow: 0 0 8px rgba(234, 88, 12, 0.6);
}

.route-progress-bar.is-active {
  width: 85%;
  opacity: 1;
}

.header-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-block: var(--space-sm);
  gap: var(--space-sm);
}
.brand-group {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}
.brand {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: var(--text-lg);
  color: var(--color-accent);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.brand-cursor {
  animation: blink 1s step-start infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
.progress-pill {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--color-accent);
  font-weight: 600;
}
.menu-toggle {
  background: var(--color-text);
  color: var(--color-surface);
  border: none;
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: background 0.2s;
}
.menu-toggle:hover {
  background: var(--color-accent);
}
.main-nav {
  display: none;
  width: 100%;
  flex-direction: column;
  gap: var(--space-xs);
  padding-top: var(--space-sm);
  border-top: 1px dashed var(--color-border);
}
.main-nav.is-open {
  display: flex;
}
.nav-link {
  text-decoration: none;
  color: var(--color-text);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all 0.2s;
}
.nav-link:hover {
  background: var(--color-bg);
  color: var(--color-accent);
}
.nav-link.router-link-active {
  background: var(--color-accent);
  color: #ffffff;
}

@media (min-width: 56rem) {
  .menu-toggle {
    display: none;
  }
  .main-nav {
    display: flex;
    width: auto;
    flex-direction: row;
    padding-top: 0;
    border-top: none;
  }
}
</style>
