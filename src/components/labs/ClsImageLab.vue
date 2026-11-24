<!-- src/components/labs/ClsImageLab.vue -->
<script setup>
import { ref } from 'vue';

const showImages = ref(false);
const isLoading = ref(false);

function simulateSlowLoad() {
  showImages.value = false;
  isLoading.value = true;
  setTimeout(() => {
    showImages.value = true;
    isLoading.value = false;
  }, 1800);
}
</script>

<template>
  <div class="lab-box">
    <div class="lab-header">
      <p class="lab-intro">
        Clique no botão abaixo para simular o download de imagens sob uma conexão 3G lenta (atraso de 1.8s)
        e observe como a reserva de espaço evita o salto visual do texto (CLS).
      </p>
      <button class="btn-simulate" :disabled="isLoading" @click="simulateSlowLoad">
        {{ isLoading ? '⏳ Carregando imagem em rede 3G lenta (1.8s)...' : '▶ Simular Atraso de Imagem (1.8s)' }}
      </button>
    </div>

    <div class="comparison-grid">
      <!-- Coluna Ruim: Sem width/height -->
      <div class="demo-col bad-example">
        <div class="col-head">
          <span class="status-pill status-bad">Prática Ruim</span>
          <h4>Sem width e height (Gera CLS)</h4>
        </div>
        <div class="col-body">
          <div class="image-zone unconstrained">
            <img
              v-if="showImages"
              src="https://picsum.photos/400/200?random=1"
              alt="Exemplo sem dimensões declaradas"
              class="loaded-img"
            />
            <div v-else class="empty-unconstrained">
              <span class="zero-height-alert">Altura reservada: 0px</span>
            </div>
          </div>
          <div class="content-target">
            <p class="target-paragraph">
              ⚠️ <strong>Este texto estava no topo!</strong> Quando a imagem baixou de repente,
              o navegador empurrou este bloco bruscamente para baixo. Em uma página real, isso faz o usuário clicar no botão errado.
            </p>
            <div class="cls-metric cls-poor">
              <span class="metric-label">Impacto no CLS:</span>
              <span class="metric-score">~ 0.35 (Ruim / Pobre)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Coluna Boa: Com width="400" height="200" e aspect-ratio -->
      <div class="demo-col good-example">
        <div class="col-head">
          <span class="status-pill status-good">Boa Prática</span>
          <h4>Com width="400" height="200" (CLS = 0)</h4>
        </div>
        <div class="col-body">
          <div class="image-zone reserved-slot">
            <img
              v-if="showImages"
              src="https://picsum.photos/400/200?random=2"
              width="400"
              height="200"
              alt="Exemplo com dimensões e proporção intrínseca"
              class="loaded-img"
            />
            <div v-else class="reserved-placeholder">
              <span class="placeholder-label">Espaço Reservado: 400 × 200 (Proporção 2:1)</span>
            </div>
          </div>
          <div class="content-target">
            <p class="target-paragraph">
              ✓ <strong>O espaço já estava reservado!</strong> O navegador calculou a proporção intrínseca
              <code>aspect-ratio: 400/200</code> antes de receber o primeiro byte da imagem. O texto não se moveu 1 milímetro.
            </p>
            <div class="cls-metric cls-good">
              <span class="metric-label">Impacto no CLS:</span>
              <span class="metric-score">0.00 (Excelente / Zero Shift)</span>
            </div>
          </div>
        </div>
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

.lab-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.lab-intro {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.btn-simulate {
  background: var(--color-accent);
  color: #fff;
  border: none;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 700;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s;
}

.btn-simulate:hover:not(:disabled) {
  background: var(--color-accent-hover);
}

.btn-simulate:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

@media (min-width: 48rem) {
  .comparison-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.demo-col {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.bad-example {
  border-top: 3px solid var(--color-danger);
}

.good-example {
  border-top: 3px solid var(--color-success);
}

.col-head {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.status-pill {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-sm);
  align-self: flex-start;
  text-transform: uppercase;
}

.status-bad {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

.status-good {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.col-head h4 {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text);
}

.col-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.image-zone {
  width: 100%;
}

.unconstrained {
  min-height: 0px;
}

.empty-unconstrained {
  background: #f4f4f5;
  border: 1px dashed var(--color-danger);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
}

.zero-height-alert {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-danger);
  font-weight: 600;
}

.reserved-slot {
  aspect-ratio: 400 / 200;
  max-width: 100%;
  background: #e4e4e7;
  border-radius: var(--radius-sm);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--color-success);
}

.reserved-placeholder {
  padding: var(--space-sm);
  text-align: center;
}

.placeholder-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-success);
  font-weight: 600;
}

.loaded-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--radius-sm);
}

.content-target {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.target-paragraph {
  margin: 0;
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--color-text);
}

.cls-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  margin-top: var(--space-xs);
}

.cls-poor {
  background: var(--color-danger-bg);
  color: var(--color-danger);
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.cls-good {
  background: var(--color-success-bg);
  color: var(--color-success);
  border: 1px solid rgba(5, 150, 105, 0.2);
}

.metric-score {
  font-weight: 700;
}
</style>
