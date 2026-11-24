<!-- src/components/labs/UnitConverterLab.vue -->
<script setup>
import { ref, computed } from 'vue';
import { useGuideStore } from '@/stores/useGuideStore';

const store = useGuideStore();
const amount = ref(1.5);
const unit = ref('rem');
const parentPx = ref(20);

const resultPx = computed(() => {
  if (unit.value === 'rem') return amount.value * store.baseFontSize;
  if (unit.value === 'em') return amount.value * parentPx.value;
  if (unit.value === '%') return (amount.value / 100) * parentPx.value;
  return 0;
});

const formulaText = computed(() => {
  if (unit.value === 'rem') {
    return `${amount.value}rem × ${store.baseFontSize}px (raiz html) = ${resultPx.value.toFixed(2)}px`;
  }
  if (unit.value === 'em') {
    return `${amount.value}em × ${parentPx.value}px (elemento pai) = ${resultPx.value.toFixed(2)}px`;
  }
  return `(${amount.value}% / 100) × ${parentPx.value}px (elemento pai) = ${resultPx.value.toFixed(2)}px`;
});
</script>

<template>
  <div class="lab-box">
    <div class="controls-grid">
      <div class="control-group">
        <label for="input-amount">Valor Numérico:</label>
        <input id="input-amount" v-model.number="amount" type="number" step="0.25" class="lab-input" />
      </div>

      <div class="control-group">
        <label for="select-unit">Unidade CSS:</label>
        <select id="select-unit" v-model="unit" class="lab-select">
          <option value="rem">rem (relativo à raiz)</option>
          <option value="em">em (relativo ao pai)</option>
          <option value="%">% (porcentagem do pai)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="input-root">Raiz HTML :root (px):</label>
        <input
          id="input-root"
          v-model.number="store.baseFontSize"
          type="number"
          min="10"
          max="32"
          class="lab-input"
          title="Tamanho base da fonte definido no navegador ou html (padrão 16px)"
        />
      </div>

      <div v-if="unit !== 'rem'" class="control-group">
        <label for="input-parent">Fonte do Pai (px):</label>
        <input id="input-parent" v-model.number="parentPx" type="number" min="8" max="48" class="lab-input" />
      </div>
    </div>

    <div class="result-card">
      <div class="result-formula">
        <span class="formula-label">Cálculo em Tempo Real:</span>
        <code class="formula-code">{{ formulaText }}</code>
      </div>
      <div class="result-highlight">
        <span class="output-value"><code>{{ amount }}{{ unit }}</code> = <strong>{{ resultPx.toFixed(2) }}px</strong></span>
      </div>
    </div>

    <!-- Amostra Visual -->
    <div class="visual-preview">
      <span class="preview-label">Amostra Visual com este tamanho:</span>
      <div class="preview-box" :style="{ fontSize: Math.min(Math.max(resultPx, 10), 48) + 'px' }">
        Texto de Exemplo Caderno de Engenharia
      </div>
    </div>
  </div>
</template>

<style scoped>
.lab-box {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.controls-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

@media (min-width: 38rem) {
  .controls-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.control-group label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-muted);
}

.lab-input, .lab-select {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text);
}

.lab-input:focus, .lab-select:focus {
  outline: none;
  border-color: var(--color-accent);
}

.result-card {
  background: var(--color-surface);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.result-formula {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.formula-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.formula-code {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text);
  background: transparent;
  padding: 0;
}

.result-highlight {
  margin-top: var(--space-xs);
  padding-top: var(--space-xs);
  border-top: 1px dashed var(--color-border);
}

.output-value {
  font-size: var(--text-base);
  color: var(--color-text);
}

.output-value strong {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--text-lg);
}

.visual-preview {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.preview-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.preview-box {
  background: var(--color-surface);
  border: 1px dashed var(--color-border-dark);
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-md);
  color: var(--color-text);
  font-weight: 500;
  line-height: 1.3;
  overflow-wrap: anywhere;
  word-break: break-word;
}
</style>
