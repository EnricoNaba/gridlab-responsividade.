<!-- src/views/HomeView.vue -->
<script setup>
import { RouterLink } from 'vue-router';
import { useGuideStore } from '@/stores/useGuideStore';

const store = useGuideStore();

const sections = [
  {
    id: 'importancia',
    num: '01',
    title: 'Importância da Responsividade & Viewport',
    summary: 'A meta tag viewport, resolução lógica vs física, viewport virtual de 980px e o colapso sem escala mobile.',
    to: '/importancia',
    lab: 'Lab 1 (Viewport Badge fixo)',
  },
  {
    id: 'unidades',
    num: '02',
    title: 'Unidades Relativas vs Absolutas',
    summary: 'rem, em, % e px sob a lente da acessibilidade. Como a preferência do usuário no navegador altera a escala.',
    to: '/unidades',
    lab: 'Lab 2 (Conversor rem/em/% em tempo real)',
  },
  {
    id: 'flexbox-grid',
    num: '03',
    title: 'Layout Moderno: Flexbox & CSS Grid',
    summary: '1D vs 2D, alinhamento flexível e a fórmula matemática de colunas no repeat(auto-fit, minmax(14rem, 1fr)).',
    to: '/flexbox-grid',
    lab: 'Lab 3 (Slider de contêiner e gatilhos de coluna)',
  },
  {
    id: 'imagens',
    num: '04',
    title: 'Imagens Responsivas & Performance (CLS)',
    summary: 'picture, srcset, sizes, aspect-ratio e a métrica Core Web Vitals Cumulative Layout Shift.',
    to: '/imagens',
    lab: 'Lab 4 (Simulador de atraso 3G e salto visual)',
  },
  {
    id: 'boas-praticas',
    num: '05',
    title: 'Boas Práticas de Engenharia Front-End',
    summary: 'Mobile-first com min-width, Virtual DOM do Vue 3 e o bug de reconciliação em v-for sem key.',
    to: '/boas-praticas',
    lab: 'Lab 5 (Demonstração prática de reconciliação v-for)',
  },
  {
    id: 'desafio',
    num: '06',
    title: 'Desafio Final: Engenharia GridLab',
    summary: 'Gabarito oficial interativo com formulário de resposta validado e checklist de publicação.',
    to: '/desafio',
    lab: 'Desafio Interativo (Validação de 704px)',
  },
];

</script>

<template>
  <div class="container home-container">
    <!-- Hero / Cabeçalho Técnico -->
    <header class="hero-card">
      <div class="blueprint-meta">
        <span class="meta-tag">ESPECIFICAÇÃO TÉCNICA</span>
        <span class="meta-tag">VUE 3 • PINIA • VITE</span>
        <span class="meta-tag">SEMESTRE 2026/2</span>
      </div>
      <h1 class="hero-title">
        GridLab<span class="text-accent">//</span> Caderno de Engenharia
      </h1>
      <p class="hero-subtitle">
        Guia Prático e Interativo de Responsividade Web Front-End.
        Arquitetura construída sob os preceitos de <strong>Mobile-First</strong>,
        <strong>design tokens</strong> em rem, rotas sob demanda (Lazy Loading),
        gerenciamento reativo com <strong>Pinia</strong> e laboratórios em tempo real.
      </p>

      <!-- Barra de Progresso Global -->
      <div class="progress-bar-wrapper">
        <div class="progress-info">
          <span class="progress-label">Progresso do Caderno de Engenharia:</span>
          <strong class="progress-val">{{ store.progressPercentage }}% Concluído ({{ store.completedSections.length }}/6 seções)</strong>
        </div>
        <div class="progress-track" role="progressbar" :aria-valuenow="store.progressPercentage" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" :style="{ width: store.progressPercentage + '%' }"></div>
        </div>
      </div>

      <!-- Autor -->
      <div class="author-row">
        <span class="author-label">Autor:</span>
        <span class="author-name">Enrico Augusto Pereira Naba</span>
      </div>
    </header>

    <!-- Grade de Módulos do Guia -->
    <section class="modules-section">
      <div class="section-header-block">
        <span class="badge">Conteúdo Programático</span>
        <h2>Módulos Técnicos e Laboratórios</h2>
      </div>

      <div class="modules-grid">
        <div
          v-for="sec in sections"
          :key="sec.id"
          :class="['module-card', { 'is-completed': store.completedSections.includes(sec.id) }]"
        >
          <div class="module-head">
            <span class="module-num">{{ sec.num }}</span>
            <span
              :class="['module-status', store.completedSections.includes(sec.id) ? 'status-done' : 'status-pending']"
            >
              {{ store.completedSections.includes(sec.id) ? '✓ Concluído' : 'Pendente' }}
            </span>
          </div>

          <h3 class="module-title">{{ sec.title }}</h3>
          <p class="module-summary">{{ sec.summary }}</p>

          <div class="module-lab-badge">
            <span class="lab-icon">⚗</span>
            <span>{{ sec.lab }}</span>
          </div>

          <div class="module-footer">
            <RouterLink :to="sec.to" class="btn-navigate">
              Acessar Seção {{ sec.num }} →
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

/* Hero */
.hero-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
  position: relative;
}

.blueprint-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-bottom: var(--space-sm);
}

.meta-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
}

.hero-title {
  font-size: var(--text-xl);
  color: var(--color-text);
  margin: 0 0 var(--space-sm);
  line-height: 1.2;
}

.text-accent {
  color: var(--color-accent);
}

.hero-subtitle {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  margin: 0 0 var(--space-lg);
  line-height: 1.6;
}

.hero-subtitle strong {
  color: var(--color-text);
}

/* Progress bar */
.progress-bar-wrapper {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
}

.progress-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: var(--space-xs);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

@media (min-width: 36rem) {
  .progress-info {
    flex-direction: row;
    justify-content: space-between;
  }
}

.progress-label {
  color: var(--color-text-muted);
}

.progress-val {
  color: var(--color-accent);
}

.progress-track {
  height: 8px;
  background: var(--color-border);
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-accent);
  transition: width 0.3s ease;
}

/* Autor */
.author-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: var(--space-md);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--color-border);
}

.author-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 600;
}

.author-name {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-accent);
  font-weight: 700;
}

/* Card base */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
}

.section-badge-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.badge {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  background: var(--color-text);
  color: var(--color-surface);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-sm);
}

.tech-spec {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

/* Grade de Módulos */
.modules-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.section-header-block h2 {
  font-size: var(--text-lg);
  margin: var(--space-xs) 0 0;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: var(--space-md);
}

.module-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-sm);
  transition: transform 0.2s, box-shadow 0.2s;
}

.module-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.module-card.is-completed {
  border-left: 4px solid var(--color-success);
}

.module-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.module-num {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: var(--text-lg);
  color: var(--color-accent);
}

.module-status {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-sm);
}

.status-done {
  background: var(--color-success-bg);
  color: var(--color-success);
  border: 1px solid var(--color-success);
}

.status-pending {
  background: var(--color-bg);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

.module-title {
  font-size: var(--text-base);
  margin: 0;
  color: var(--color-text);
  line-height: 1.3;
}

.module-summary {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin: 0;
  flex: 1;
}

.module-lab-badge {
  background: var(--color-bg);
  border: 1px dashed var(--color-border-dark);
  border-radius: var(--radius-sm);
  padding: 0.35rem 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-accent);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.btn-navigate {
  display: inline-block;
  width: 100%;
  text-align: center;
  background: var(--color-text);
  color: var(--color-surface);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  transition: background 0.2s;
}

.btn-navigate:hover {
  background: var(--color-accent);
}

@media (min-width: 48rem) {
  .hero-card {
    padding: var(--space-lg);
  }
  .hero-title {
    font-size: var(--text-2xl);
  }
}
</style>
