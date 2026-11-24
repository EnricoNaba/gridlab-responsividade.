<!-- src/views/FlexboxGridView.vue -->
<script setup>
import SectionLayout from '@/components/ui/SectionLayout.vue';
import GridContainerLab from '@/components/labs/GridContainerLab.vue';

const sources = [
  { url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Grid_Layout', label: 'MDN Web Docs — Guia Completo de CSS Grid Layout' },
  { url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', label: 'CSS-Tricks — A Complete Guide to CSS Grid' },
  { url: 'https://web.dev/learn/css/grid/', label: 'web.dev (Google) — Aprenda CSS Grid Moderno' },
];
</script>

<template>
  <div class="page-view">
    <SectionLayout
      section-id="flexbox-grid"
      number="03"
      title="Layout Moderno: Flexbox & CSS Grid"
      guide-question="repeat(auto-fit, minmax(14rem, 1fr)) e gap: 1rem. Em qual largura (px) passa de 1 para 2 colunas? (1rem = 16px)"
      :sources="sources"
    >
      <!-- 1. Explicação Prática -->
      <template #explanation>
        <p>
          No desenvolvimento front-end contemporâneo, a decisão entre <strong>CSS Flexbox</strong> e <strong>CSS Grid</strong> não é de concorrência, mas de complementaridade arquitetural:
        </p>

        <h3>3.1. Flexbox (1D - Unidimensional) vs Grid (2D - Bidimensional)</h3>
        <div class="comparison-table-wrapper">
          <table class="tech-table">
            <thead>
              <tr>
                <th>Critério</th>
                <th>CSS Flexbox (1D)</th>
                <th>CSS Grid (2D)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Dimensão</strong></td>
                <td>1 dimensão por vez (Linha OU Coluna)</td>
                <td>2 dimensões simultâneas (Linhas E Colunas)</td>
              </tr>
              <tr>
                <td><strong>Filosofia</strong></td>
                <td><em>Content-first</em> (os itens definem seu espaço)</td>
                <td><em>Layout-first</em> (a estrutura define onde os itens entram)</td>
              </tr>
              <tr>
                <td><strong>Caso de Uso Ideal</strong></td>
                <td>Barras de navegação, botões, chips, cabeçalhos, alinhamento de ícone com texto</td>
                <td>Páginas completas, galerias de cards, painéis de dashboards, layouts técnicos</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>3.2. Responsividade Intrínseca com auto-fit e minmax()</h3>
        <p>
          A abordagem tradicional de responsividade dependia de dezenas de media queries imperativas:
          <code>@media (min-width: 480px)</code> para 2 colunas, <code>@media (min-width: 768px)</code> para 3 colunas, etc.
        </p>
        <p>
          Com o CSS Grid, alcançamos o que a engenharia de software chama de <strong>responsividade intrínseca</strong>:
        </p>
        <pre><code>grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
gap: 1rem;</code></pre>
        <ul>
          <li><code>minmax(14rem, 1fr)</code>: Cada coluna deve ter pelo menos <code>14rem</code> de largura. Caso haja sobras no espaço horizontal, ela se expande proporcionalmente usando <code>1fr</code> (fração do espaço livre).</li>
          <li><code>auto-fit</code>: O navegador cria tantas colunas quantas couberem na largura física disponível. Se houver apenas 1 coluna, ela se expande para ocupar os 100%.</li>
        </ul>

        <h3>3.3. A Matemática Exata dos Gatilhos de Quebra</h3>
        <p>
          Considerando a fonte raiz padrão de <code>1rem = 16px</code>:
        </p>
        <ul>
          <li>Tamanho mínimo de 1 coluna: <code>14rem × 16px = 224px</code></li>
          <li>Espaçamento entre colunas (gap): <code>1rem = 16px</code></li>
          <li><strong>Condição para 2 colunas:</strong> <code>Card 1 (224px) + Gap (16px) + Card 2 (224px) = 464px</code></li>
          <li><strong>Condição para 3 colunas:</strong> <code>224px + 16px + 224px + 16px + 224px = 704px</code></li>
        </ul>
        <p>
          Enquanto a largura interna útil for de 463px, não há espaço físico suficiente para a segunda coluna, e o contêiner permanece em 1 coluna.
          No instante em que atinge <strong>464px</strong>, a segunda coluna se materializa instantaneamente.
        </p>
      </template>

      <!-- 2. Exemplo de Código Comentado -->
      <template #code>
        <pre><code>/* ==========================================================================
     GRADE RESPONSIVA INTRÍNSECA (Sem necessidade de media queries manuais!)
     ========================================================================== */

  .card-grid-container {
    display: grid;
    /* Cria tantas colunas de no mínimo 14rem (224px) quantas couberem;
       se sobrar espaço, expande igualmente com 1fr */
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 1rem; /* 16px de espaçamento entre células */
    width: 100%;
  }

  /* Sinergia: Card estilizado internamente com Flexbox (1D) */
  .card-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
  }

  .card-item-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }</code></pre>
      </template>

      <!-- Laboratório Interativo: Lab 3 -->
      <template #lab>
        <GridContainerLab />
      </template>

      <!-- 3. Resposta à Pergunta-Guia -->
      <template #answer>
        <p>
          <strong>Largura mínima de 1 coluna: 14 × 16 = 224px. Espaço entre 2 colunas (gap): 1 × 16 = 16px. Conta: 224 + 16 + 224 = 464px. A partir de 464px de largura interna útil do contêiner, o grid exibe 2 colunas.</strong>
        </p>
        <p>
          <em>Demonstração analítica:</em> Em um contêiner com <code>repeat(auto-fit, minmax(14rem, 1fr))</code> e <code>gap: 1rem</code>, cada coluna exige rigorosamente 224px (14 × 16px). Para que o algoritmo de layout posicione duas colunas simultâneas lado a lado, é obrigatório acomodar a largura mínima de ambas mais a calha do gap: <code>224px + 16px + 224px = 464px</code>. Qualquer valor entre 260px e 463px resultará em apenas 1 coluna alargada pelo <code>1fr</code>.
        </p>
      </template>
    </SectionLayout>
  </div>
</template>

<style scoped>
.page-view {
  width: 100%;
}

.comparison-table-wrapper {
  overflow-x: auto;
  margin-bottom: var(--space-md);
}

.tech-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-xs);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.tech-table th, .tech-table td {
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--color-border);
  text-align: left;
  overflow-wrap: break-word;
}

@media (min-width: 48rem) {
  .tech-table {
    font-size: var(--text-sm);
  }
  .tech-table th, .tech-table td {
    padding: var(--space-sm) var(--space-md);
  }
}

.tech-table th {
  background: var(--color-bg);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-accent);
}
</style>
