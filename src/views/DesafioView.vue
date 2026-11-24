<!-- src/views/DesafioView.vue -->
<script setup>
import { ref } from 'vue';
import SectionLayout from '@/components/ui/SectionLayout.vue';
import { useGuideStore } from '@/stores/useGuideStore';

const store = useGuideStore();

const sources = [
  { url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Grid_Layout', label: 'MDN Web Docs — Especificação Oficial de CSS Grid' },
  { url: 'https://web.dev/learn/css/grid/', label: 'web.dev — Desafios de Dimensionamento de Contêineres' },
  { url: 'https://vuejs.org/guide/introduction.html', label: 'Vue.js — Documentação Oficial do Ecossistema' },
];

const userAnswer = ref('');
const feedbackStatus = ref(null); // 'correct' | 'wrong' | null

function validateAnswer() {
  const clean = String(userAnswer.value).trim().toLowerCase().replace('px', '').trim();
  if (clean === '704') {
    feedbackStatus.value = 'correct';
    // Auto-completa a seção no Pinia se ainda não estiver concluída
    if (!store.completedSections.includes('desafio')) {
      store.toggleSectionComplete('desafio');
    }
  } else {
    feedbackStatus.value = 'wrong';
  }
}
</script>

<template>
  <div class="page-view">
    <SectionLayout
      section-id="desafio"
      number="06"
      title="Desafio Final: Engenharia GridLab"
      guide-question="No Laboratório de Grid (Seção 3), qual a largura mínima exata (em px) para exibir 3 colunas simultâneas?"
      :sources="sources"
    >
      <!-- 1. Explicação Prática -->
      <template #explanation>
        <p>
          O <strong>Desafio Final</strong> é a etapa de consolidação onde os conceitos de responsividade intrínseca, cálculo de unidades relativas (<code>rem</code>) e comportamento de calhas (<code>gap</code>) são colocados à prova prática.
        </p>

        <h3>6.1. O Enunciado do Desafio de Engenharia</h3>
        <p>
          No <strong>Laboratório 3 (Flex & Grid)</strong>, implementamos um contêiner elástico governado pela seguinte regra CSS moderna:
        </p>
        <pre v-pre><code>.container-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}</code></pre>
        <p>
          Sabendo que a fonte raiz herdada pelo navegador é <code>1rem = 16px</code>, os engenheiros da equipe necessitam dimensionar um painel de controle que garanta <strong>rigorosamente 3 colunas simultâneas</strong> sem empacotamento vertical.
        </p>
        <p>
          Qual é a largura mínima exata em pixels que a div contêiner precisa possuir para que a terceira coluna se materialize?
        </p>
      </template>

      <!-- 2. Exemplo de Código Comentado -->
      <template #code>
        <pre v-pre><code>// Validação Reativa do Desafio em Vue 3 (Composition API)
import { ref } from 'vue';
import { useGuideStore } from '@/stores/useGuideStore';

const store = useGuideStore();
const userAnswer = ref('');
const feedbackStatus = ref(null);

function validateAnswer() {
  // Higieniza a entrada removendo sufixos como 'px' e espaços em branco
  const clean = String(userAnswer.value).trim().toLowerCase().replace('px', '').trim();
  
  if (clean === '704') {
    feedbackStatus.value = 'correct';
    // Registra a conclusão com persistência automática no Pinia!
    if (!store.completedSections.includes('desafio')) {
      store.toggleSectionComplete('desafio');
    }
  } else {
    feedbackStatus.value = 'wrong';
  }
}</code></pre>
      </template>

      <!-- Laboratório Interativo: Formulário de Resposta do Desafio -->
      <template #lab>
        <div class="challenge-lab-box">
          <div class="challenge-header">
            <span class="challenge-pill">Validador de Engenharia</span>
            <h3>Formulário de Resposta do Desafio</h3>
            <p>
              Insira o valor numérico que você calculou ou descobriu manipulando o slider do Laboratório 3:
            </p>
          </div>

          <form class="challenge-form" @submit.prevent="validateAnswer">
            <div class="input-row">
              <div class="field-wrap">
                <label for="answer-input">Largura Mínima Necessária:</label>
                <div class="input-with-addon">
                  <input
                    id="answer-input"
                    v-model="userAnswer"
                    type="text"
                    placeholder="Ex: 704"
                    class="challenge-input"
                    autocomplete="off"
                  />
                  <span class="addon">px</span>
                </div>
              </div>
              <button type="submit" class="btn-validate">
                Validar Resposta
              </button>
            </div>
          </form>

          <!-- Feedback de Validação -->
          <div v-if="feedbackStatus === 'correct'" class="feedback-card feedback-success">
            <div class="feedback-icon">✓</div>
            <div class="feedback-body">
              <strong>Parabéns! Resposta Exata: 704px</strong>
              <p>
                Você dominou o cálculo de contêineres intrínsecos! O algoritmo do CSS Grid precisa de:
                <br />
                <code>Card 1 (224px) + Gap (16px) + Card 2 (224px) + Gap (16px) + Card 3 (224px) = 704px</code>.
                <br />
                <em>O Desafio Final foi marcado como concluído no seu caderno!</em>
              </p>
            </div>
          </div>

          <div v-else-if="feedbackStatus === 'wrong'" class="feedback-card feedback-error">
            <div class="feedback-icon">✕</div>
            <div class="feedback-body">
              <strong>Valor Incorreto. Tente Novamente!</strong>
              <p>
                <em>Dica Técnica de Engenharia:</em> 14rem equivalem a 224px. O gap entre colunas é de 1rem (16px).
                Para acomodar 3 colunas lado a lado, você precisa da largura de 3 cards mais 2 calhas de espaçamento entre eles.
                Você também pode retornar ao <strong>Laboratório 3 (Flex & Grid)</strong> e arrastar o slider até o medidor registrar "3 Colunas Ativas"!
              </p>
            </div>
          </div>
        </div>
      </template>

      <!-- 3. Resposta à Pergunta-Guia -->
      <template #answer>
        <p>
          <strong>Pergunta criada pela dupla: "No Laboratório de Grid (Seção 3), qual a largura mínima exata (em px) para exibir 3 colunas simultâneas?" Resposta validada no formulário: 704px (224 + 16 + 224 + 16 + 224 = 704px).</strong>
        </p>
        <p>
          <em>Memória de Cálculo Detalhada:</em>
        </p>
        <ul>
          <li>Largura mínima por card: <code>14rem × 16px/rem = 224px</code></li>
          <li>Espaço entre colunas adjacentes (gap): <code>1rem × 16px/rem = 16px</code></li>
          <li>Quantidade de colunas desejadas: <code>3 colunas</code></li>
          <li>Quantidade de calhas (gaps) entre 3 colunas: <code>3 - 1 = 2 gaps</code></li>
          <li>Fórmula Total: <code>(3 × 224px) + (2 × 16px) = 672px + 32px = 704px</code>.</li>
        </ul>
        <p>
          Com 703px de contêiner, o espaço é insuficiente em apenas 1 pixel, forçando o navegador a manter 2 colunas alargadas. Atingidos os <strong>704px</strong>, a 3ª coluna encaixa perfeitamente.
        </p>
      </template>
    </SectionLayout>
  </div>
</template>

<style scoped>
.page-view {
  width: 100%;
}

.challenge-lab-box {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.challenge-header h3 {
  margin: var(--space-xs) 0;
  font-size: var(--text-base);
}

.challenge-header p {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.challenge-pill {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-accent);
  display: inline-block;
}

.challenge-form {
  display: flex;
  flex-direction: column;
}

.input-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  align-items: flex-start;
}

@media (min-width: 36rem) {
  .input-row {
    flex-direction: row;
    align-items: flex-end;
  }
}

.field-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field-wrap label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 600;
}

.input-with-addon {
  display: flex;
  align-items: center;
}

.challenge-input {
  padding: 0.45rem 0.65rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
  background: var(--color-surface);
  font-family: var(--font-mono);
  font-size: var(--text-base);
  color: var(--color-text);
  min-width: 0;
  width: 100%;
  max-width: 140px;
}

.challenge-input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.addon {
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-left: none;
  padding: 0.45rem 0.65rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.btn-validate {
  width: 100%;
  background: var(--color-text);
  color: var(--color-surface);
  border: none;
  padding: 0.55rem 1.25rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

@media (min-width: 36rem) {
  .btn-validate {
    width: auto;
  }
}

.btn-validate:hover {
  background: var(--color-accent);
}

.feedback-card {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-md);
  border-radius: var(--radius-sm);
  border: 1px solid;
}

.feedback-icon {
  font-size: var(--text-xl);
  font-weight: 700;
}

.feedback-body strong {
  display: block;
  font-size: var(--text-sm);
  margin-bottom: 0.25rem;
}

.feedback-body p {
  margin: 0;
  font-size: var(--text-xs);
  line-height: 1.6;
}

.feedback-success {
  background: var(--color-success-bg);
  border-color: var(--color-success);
  color: #065f46;
}

.feedback-error {
  background: var(--color-danger-bg);
  border-color: var(--color-danger);
  color: #991b1b;
}
</style>
