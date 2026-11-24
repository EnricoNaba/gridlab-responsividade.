<!-- src/components/labs/GridContainerLab.vue -->
<script setup>
import { ref, computed } from 'vue';

const containerWidth = ref(440);

// 14rem = 224px (assumindo raiz 16px) | gap = 1rem = 16px
// 1 coluna: < 464px (224px úteis)
// 2 colunas: 224 + 16 + 224 = 464px
// 3 colunas: 224 + 16 + 224 + 16 + 224 = 704px
const activeColumns = computed(() => {
  if (containerWidth.value >= 704) return 3;
  if (containerWidth.value >= 464) return 2;
  return 1;
});

const nextThresholdText = computed(() => {
  if (containerWidth.value < 464) {
    return `Faltam ${464 - containerWidth.value}px para saltar para 2 colunas (gatilho: 464px)`;
  }
  if (containerWidth.value < 704) {
    return `Faltam ${704 - containerWidth.value}px para saltar para 3 colunas (gatilho: 704px)`;
  }
  return 'Capacidade máxima atingida com 3 colunas simultâneas!';
});
</script>

<template>
  <div class="lab-box">
    <div class="slider-control">
      <div class="slider-header">
        <label for="width-slider">
          Largura do Contêiner: <strong>{{ containerWidth }}px</strong>
        </label>
        <span class="column-badge">
          {{ activeColumns }} Coluna{{ activeColumns > 1 ? 's' : '' }} Ativa{{ activeColumns > 1 ? 's' : '' }}
        </span>
      </div>
      <input
        id="width-slider"
        v-model.number="containerWidth"
        type="range"
        min="260"
        max="820"
        step="4"
        class="width-range"
      />
      <div class="range-ticks">
        <span>260px (Mobile)</span>
        <span class="threshold-marker">464px (2 Colunas)</span>
        <span class="threshold-marker">704px (3 Colunas)</span>
        <span>820px</span>
      </div>
    </div>

    <div class="threshold-notice">
      <span class="notice-icon">⚙</span>
      <span class="notice-text">{{ nextThresholdText }}</span>
    </div>

    <!-- Contêiner responsivo com grid auto-fit real -->
    <div class="resizable-wrapper" :style="{ width: containerWidth + 'px', maxWidth: '100%' }">
      <div class="container-ruler">{{ containerWidth }}px</div>
      <div class="demo-grid">
        <div class="grid-card">
          <span class="card-num">01</span>
          <strong>Card 1</strong>
          <span class="card-sub">min 14rem (224px)</span>
        </div>
        <div class="grid-card">
          <span class="card-num">02</span>
          <strong>Card 2</strong>
          <span class="card-sub">min 14rem (224px)</span>
        </div>
        <div class="grid-card">
          <span class="card-num">03</span>
          <strong>Card 3</strong>
          <span class="card-sub">min 14rem (224px)</span>
        </div>
      </div>
    </div>

    <div class="math-breakdown">
      <h4>Memória de Cálculo (Gabarito Técnico):</h4>
      <ul>
        <li><strong>Largura mínima de 1 coluna:</strong> <code>14rem × 16px = 224px</code></li>
        <li><strong>Espaçamento entre colunas (gap):</strong> <code>1rem = 16px</code></li>
        <li><strong>Fórmula para 2 colunas:</strong> <code>224px + 16px + 224px = 464px</code></li>
        <li><strong>Fórmula para 3 colunas:</strong> <code>224px + 16px + 224px + 16px + 224px = 704px</code></li>
      </ul>
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

.slider-control {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.slider-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-xs);
}

.slider-header label {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text);
}

.slider-header strong {
  color: var(--color-accent);
}

.column-badge {
  background: var(--color-text);
  color: var(--color-surface);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-sm);
  font-weight: 700;
}

.width-range {
  width: 100%;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.range-ticks {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-xs);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--color-text-muted);
}

.threshold-marker {
  color: var(--color-accent);
  font-weight: 700;
}

.threshold-notice {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent);
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.notice-icon {
  color: var(--color-accent);
}

.resizable-wrapper {
  border: 2px dashed var(--color-accent);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  padding: var(--space-md);
  margin-inline: auto;
  position: relative;
  transition: width 0.1s linear;
}

.container-ruler {
  position: absolute;
  top: -0.65rem;
  right: 0.5rem;
  background: var(--color-accent);
  color: #fff;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  padding: 0.1rem 0.4rem;
  border-radius: 2px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: 1rem;
}

.grid-card {
  background: var(--color-text);
  color: var(--color-surface);
  padding: var(--space-md);
  text-align: center;
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border: 1px solid var(--color-border-dark);
}

.card-num {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-accent);
}

.card-sub {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-surface-muted);
}

.math-breakdown {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-md);
}

.math-breakdown h4 {
  margin: 0 0 var(--space-xs);
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  color: var(--color-text-muted);
}

.math-breakdown ul {
  margin: 0;
  padding-left: var(--space-md);
  font-size: var(--text-xs);
  line-height: 1.6;
}
</style>
