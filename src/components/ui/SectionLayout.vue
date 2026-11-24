<!-- src/components/ui/SectionLayout.vue -->
<script setup>
import { computed } from 'vue';
import { useGuideStore } from '@/stores/useGuideStore';

const props = defineProps({
  sectionId: { type: String, required: true },
  number: { type: String, required: true },
  title: { type: String, required: true },
  guideQuestion: { type: String, required: true },
  sources: { type: Array, required: true },
});

const store = useGuideStore();
const isDone = computed(() => {
  return Array.isArray(store.completedSections) && store.completedSections.includes(props.sectionId);
});
</script>

<template>
  <article class="container section-wrapper">
    <header class="section-head">
      <div class="head-top">
        <span class="badge">Seção {{ number }}</span>
        <span v-if="isDone" class="status-done">✓ Concluída</span>
      </div>
      <h1 class="section-title">{{ title }}</h1>
    </header>

    <section class="card technical-card">
      <div class="card-tag">PARTE 1</div>
      <h2>1. Explicação Prática</h2>
      <div class="card-content">
        <slot name="explanation" />
      </div>
    </section>

    <section class="card technical-card">
      <div class="card-tag">PARTE 2</div>
      <h2>2. Exemplo de Código Comentado</h2>
      <div class="card-content">
        <slot name="code" />
      </div>
    </section>

    <section v-if="$slots.lab" class="card lab-highlight">
      <div class="card-tag lab-tag">LABORATÓRIO INTERATIVO</div>
      <h2>Laboratório Prático em Tempo Real</h2>
      <div class="card-content">
        <slot name="lab" />
      </div>
    </section>

    <section class="card guide-answer">
      <div class="card-tag answer-tag">PARTE 3 • GABARITO OFICIAL</div>
      <h2>3. Resposta à Pergunta-Guia</h2>
      <div class="question-box">
        <span class="question-label">Pergunta-Guia:</span>
        <p class="question-text">{{ guideQuestion }}</p>
      </div>
      <div class="answer-box">
        <span class="answer-label">Resposta Técnica:</span>
        <div class="answer-content">
          <slot name="answer" />
        </div>
      </div>
    </section>

    <footer class="sources-box">
      <div class="sources-header">
        <div class="card-tag">PARTE 4</div>
        <h3>4. Fontes Consultadas</h3>
      </div>
      <ul class="sources-list">
        <li v-for="src in sources" :key="src.url" class="source-item">
          <a :href="src.url" target="_blank" rel="noopener noreferrer" class="source-link">
            <span class="source-icon">↗</span>
            <span class="source-label">{{ src.label }}</span>
          </a>
        </li>
      </ul>
      <div class="complete-wrapper">
        <button
          :class="['btn-complete', { 'is-done': isDone }]"
          @click="store.toggleSectionComplete(sectionId)"
        >
          {{ isDone ? '✓ Seção Concluída (Clique para desmarcar)' : 'Marcar Seção como Estudada' }}
        </button>
      </div>
    </footer>
  </article>
</template>

<style scoped>
.section-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  max-width: 58rem;
}

.section-head {
  border-bottom: 2px solid var(--color-border);
  padding-bottom: var(--space-md);
}

.head-top {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  background: var(--color-text);
  color: var(--color-surface);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-sm);
  letter-spacing: 0.05em;
}

.status-done {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-success);
  background: var(--color-success-bg);
  border: 1px solid var(--color-success);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.section-title {
  font-size: var(--text-xl);
  color: var(--color-text);
  margin: var(--space-xs) 0 0;
  line-height: 1.25;
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
  position: relative;
  min-width: 0;
}

.card-tag {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
  margin-bottom: var(--space-xs);
}

.card h2 {
  font-size: var(--text-lg);
  color: var(--color-text);
  margin-top: 0;
  margin-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--space-xs);
}

.card-content {
  color: var(--color-text);
}

.card-content :deep(p) {
  margin-top: 0;
  margin-bottom: var(--space-md);
}

.card-content :deep(ul), .card-content :deep(ol) {
  margin-bottom: var(--space-md);
  padding-left: var(--space-lg);
}

.card-content :deep(li) {
  margin-bottom: var(--space-xs);
}

/* Laboratório Especial */
.lab-highlight {
  border: 2px solid var(--color-accent);
  background: linear-gradient(to bottom, #ffffff, #fafaf9);
}

.lab-tag {
  color: var(--color-accent);
  font-weight: 700;
}

/* Gabarito / Pergunta e Resposta */
.guide-answer {
  border-left: 4px solid var(--color-accent);
}

.answer-tag {
  color: var(--color-accent);
}

.question-box {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  margin-bottom: var(--space-md);
}

.question-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  display: block;
  margin-bottom: 0.25rem;
}

.question-text {
  margin: 0;
  font-weight: 600;
  color: var(--color-text);
}

.answer-box {
  background: var(--color-accent-subtle);
  border: 1px solid rgba(234, 88, 12, 0.3);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
}

.answer-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-accent);
  display: block;
  margin-bottom: 0.25rem;
}

.answer-content {
  color: var(--color-text);
  line-height: 1.6;
}

/* Fontes */
.sources-box {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
}

.sources-box h3 {
  font-size: var(--text-base);
  margin: 0 0 var(--space-sm);
}

.sources-list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.source-item {
  margin: 0;
}

.source-link {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-accent);
  text-decoration: none;
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  overflow-wrap: anywhere;
  transition: color 0.2s;
}

.source-link:hover {
  text-decoration: underline;
  color: var(--color-accent-hover);
}

.source-icon {
  font-size: 0.8rem;
}

.complete-wrapper {
  display: flex;
  justify-content: flex-start;
  padding-top: var(--space-sm);
  border-top: 1px dashed var(--color-border);
}

.btn-complete {
  width: 100%;
  background: var(--color-text);
  color: var(--color-surface);
  border: 1px solid var(--color-text);
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

@media (min-width: 36rem) {
  .btn-complete {
    width: auto;
  }
}

.btn-complete:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
}

.btn-complete.is-done {
  background: var(--color-success);
  border-color: var(--color-success);
  color: #ffffff;
}

@media (min-width: 48rem) {
  .section-title {
    font-size: var(--text-2xl);
  }
  .card {
    padding: var(--space-lg);
  }
  .sources-box {
    padding: var(--space-lg);
  }
}
</style>
