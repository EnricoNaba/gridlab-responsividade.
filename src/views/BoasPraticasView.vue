<!-- src/views/BoasPraticasView.vue -->
<script setup>
import { ref } from 'vue';
import SectionLayout from '@/components/ui/SectionLayout.vue';

const sources = [
  { url: 'https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key', label: 'Vue.js Docs — Renderização de Listas e a Propriedade key' },
  { url: 'https://web.dev/mobile-first/', label: 'web.dev — Princípios de Arquitetura Mobile First' },
  { url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/Media_Queries/Using_media_queries', label: 'MDN Web Docs — Uso de Media Queries e Breakpoints' },
];

// Estado do Laboratório de Demonstração do Bug da key em v-for
const listWithoutKey = ref([
  { id: 1, name: 'Cachorro' },
  { id: 2, name: 'Gato' },
  { id: 3, name: 'Pássaro' },
]);

const listWithKey = ref([
  { id: 101, name: 'Cachorro' },
  { id: 102, name: 'Gato' },
  { id: 103, name: 'Pássaro' },
]);

function removeFirstWithoutKey() {
  if (listWithoutKey.value.length > 0) {
    listWithoutKey.value.shift();
  }
}

function resetWithoutKey() {
  listWithoutKey.value = [
    { id: 1, name: 'Cachorro' },
    { id: 2, name: 'Gato' },
    { id: 3, name: 'Pássaro' },
  ];
}

function removeFirstWithKey() {
  if (listWithKey.value.length > 0) {
    listWithKey.value.shift();
  }
}

function resetWithKey() {
  listWithKey.value = [
    { id: 101, name: 'Cachorro' },
    { id: 102, name: 'Gato' },
    { id: 103, name: 'Pássaro' },
  ];
}
</script>

<template>
  <div class="page-view">
    <SectionLayout
      section-id="boas-praticas"
      number="05"
      title="Boas Práticas de Engenharia Front-End"
      guide-question="v-for sem :key com inputs: usuário digita no 2º item e remove o 1º. O que acontece com o texto digitado?"
      :sources="sources"
    >
      <!-- 1. Explicação Prática -->
      <template #explanation>
        <p>
          A qualidade de uma arquitetura front-end depende de decisões estruturais consistentes no CSS e do entendimento minucioso do ciclo de vida do Virtual DOM.
        </p>

        <h3>5.1. O Paradigma Mobile-First Rigoroso</h3>
        <p>
          No design responsivo moderno, <strong>Mobile-First</strong> é uma diretriz de performance e economia de processamento:
        </p>
        <ul>
          <li>
            <strong>Estilo Base:</strong> O CSS escrito fora de blocos <code>@media</code> destina-se obrigatoriamente a smartphones de menor capacidade de processamento.
          </li>
          <li>
            <strong>Uso Exclusivo de <code>min-width</code>:</strong> As melhorias progressivas para telas maiores (tablets, laptops e monitores ultra-wide) são declaradas com media queries crescentes (ex: <code>@media (min-width: 48rem)</code> e <code>@media (min-width: 64rem)</code>).
          </li>
          <li>
            <strong>Por que evitar <code>max-width</code> (Desktop-Down):</strong> Fazer o caminho inverso força celulares a processarem folhas de estilo pesadas para desktop e, em seguida, gastarem ciclos extras anulando e resetando propriedades.
          </li>
        </ul>

        <h3>5.2. O Algoritmo de Diffing do Vue e o Bug de Patch In-Place</h3>
        <p>
          O motor do Vue 3 utiliza um <strong>Virtual DOM</strong> para calcular alterações eficientes na árvore do documento.
          Ao renderizar uma lista através da diretiva <code>v-for</code>, o Vue necessita de um identificador estável para rastrear a identidade de cada nó.
        </p>
        <p>
          Quando o desenvolvedor <strong>omite a propriedade <code>:key</code></strong> (ou comete o erro de usar o índice do array <code>:key="index"</code>), o Vue recorre ao algoritmo de <strong>patch in-place</strong> (atualização no mesmo local):
        </p>
        <ol>
          <li>O Vue não destrói e recria os elementos do DOM nativo, pois isso consumiria mais tempo de CPU.</li>
          <li>Em vez disso, ele reaproveita os nós do DOM existentes nas posições 0 e 1 e apenas altera o texto reativo.</li>
          <li>
            <strong>O problema do estado não-reativo:</strong> O valor digitado pelo usuário em um elemento <code>&lt;input&gt;</code> nativo é um estado interno do navegador (DOM), não um dado gerenciado pelo Vue.
          </li>
          <li>
            Ao remover o 1º item ("Cachorro"), o elemento DOM do índice 0 agora exibe o texto reativo do 2º item ("Gato"). E o elemento DOM do índice 1 passa a exibir o 3º item ("Pássaro").
          </li>
          <li>
            Como o <code>&lt;input&gt;</code> do índice 1 não foi movido, <strong>o texto que o usuário havia digitado no 2º item permanece visível no novo 2º item (o antigo 3º item)!</strong>
          </li>
        </ol>
        <p>
          <strong>A Solução Obrigatória:</strong> Sempre vincular <code>:key="item.id"</code> com um ID estável e exclusivo para cada registro.
        </p>
      </template>

      <!-- 2. Exemplo de Código Comentado (com v-pre para evitar que o Vue interprete as interpolações) -->
      <template #code>
        <pre v-pre><code>&lt;script setup&gt;
import { ref } from 'vue';

// Lista de tarefas com IDs estáveis e únicos
const tasks = ref([
  { id: 'uuid-1', title: 'Configurar Design Tokens' },
  { id: 'uuid-2', title: 'Escrever Media Queries com min-width' },
  { id: 'uuid-3', title: 'Testar no Smartphone Real' },
]);

function removeTask(id) {
  tasks.value = tasks.value.filter(task =&gt; task.id !== id);
}
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- BOA PRÁTICA: Usar sempre ID estável e imutável no :key --&gt;
  &lt;ul class="task-list"&gt;
    &lt;li v-for="task in tasks" :key="task.id" class="task-item"&gt;
      &lt;span&gt;{{ task.title }}&lt;/span&gt;
      &lt;!-- O input mantém o estado nativo perfeitamente vinculado à tarefa --&gt;
      &lt;input type="text" placeholder="Observações..." /&gt;
      &lt;button @click="removeTask(task.id)"&gt;Remover&lt;/button&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;</code></pre>
      </template>

      <!-- Laboratório Interativo: Demonstração ao vivo do Bug da Key -->
      <template #lab>
        <div class="key-lab-box">
          <div class="lab-instructions">
            <h4>🧪 Como reproduzir o bug ao vivo:</h4>
            <ol>
              <li>Digite uma palavra qualquer (ex: <code>"Anotação do Gato"</code>) no <strong>2º campo (Gato)</strong> de ambas as listas abaixo.</li>
              <li>Clique no botão <strong>"Remover 1º item (Cachorro)"</strong> em cada lista.</li>
              <li><strong>Observe:</strong> Na lista SEM chave, seu texto permanecerá na 2ª caixa (que agora virou o Pássaro)! Na lista COM chave, seu texto acompanhará o Gato perfeitamente!</li>
            </ol>
          </div>

          <div class="lab-columns">
            <!-- Coluna SEM :key -->
            <div class="lab-col bug-col">
              <div class="col-title-bar">
                <span class="col-tag tag-danger">Sem :key (Patch In-Place)</span>
                <h5>v-for="item in items"</h5>
              </div>
              <div class="list-actions">
                <button class="btn-action btn-danger" @click="removeFirstWithoutKey">
                  ✕ Remover 1º item
                </button>
                <button class="btn-action" @click="resetWithoutKey">Reiniciar</button>
              </div>
              <ul class="demo-list">
                <!-- SEM :key propositalmente para demonstrar o bug técnico solicitado -->
                <li v-for="item in listWithoutKey" class="demo-item">
                  <span class="item-name">{{ item.name }} (ID: {{ item.id }})</span>
                  <input type="text" placeholder="Digite algo aqui..." class="demo-input" />
                </li>
                <li v-if="listWithoutKey.length === 0" class="empty-notice">
                  Lista vazia. Clique em reiniciar.
                </li>
              </ul>
            </div>

            <!-- Coluna COM :key -->
            <div class="lab-col correct-col">
              <div class="col-title-bar">
                <span class="col-tag tag-success">Com :key="item.id" (Reconciliação Exata)</span>
                <h5>v-for="item in items" :key="item.id"</h5>
              </div>
              <div class="list-actions">
                <button class="btn-action btn-success" @click="removeFirstWithKey">
                  ✕ Remover 1º item
                </button>
                <button class="btn-action" @click="resetWithKey">Reiniciar</button>
              </div>
              <ul class="demo-list">
                <li v-for="item in listWithKey" :key="item.id" class="demo-item">
                  <span class="item-name">{{ item.name }} (ID: {{ item.id }})</span>
                  <input type="text" placeholder="Digite algo aqui..." class="demo-input" />
                </li>
                <li v-if="listWithKey.length === 0" class="empty-notice">
                  Lista vazia. Clique em reiniciar.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>

      <!-- 3. Resposta à Pergunta-Guia -->
      <template #answer>
        <p>
          <strong>O texto permanece no novo 2º item (antigo 3º animal). Sem :key única, o Vue usa patch in-place pelo índice: reaproveita os elementos &lt;input&gt; existentes nas posições 0 e 1, atualiza apenas os textos reativos e mantém o estado não-reativo (value do input) preso ao índice.</strong>
        </p>
        <p>
          <em>Fundamentação técnica completa:</em> Na ausência de uma chave estável, o algoritmo de reconciliação de nós filhos (<em>children diffing algorithm</em>) do Vue adota uma heurística de desempenho conservadora. Em vez de reconstruir o DOM, ele reatribui as propriedades reativas sobre as tags HTML pré-existentes na mesma posição orbital do array. Elementos de formulário como <code>&lt;input&gt;</code> contêm estado nativo de renderização do browser; como esse estado não é reativo por padrão, ele acaba "órfão" e preso ao elemento do índice geométrico, e não ao dado lógico correspondente.
        </p>
      </template>
    </SectionLayout>
  </div>
</template>

<style scoped>
.page-view {
  width: 100%;
}

.key-lab-box {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.lab-instructions {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
}

.lab-instructions h4 {
  margin: 0 0 var(--space-xs);
  font-size: var(--text-sm);
  color: var(--color-accent);
}

.lab-instructions ol {
  margin: 0;
  padding-left: var(--space-md);
  font-size: var(--text-xs);
  color: var(--color-text);
  line-height: 1.5;
}

.lab-columns {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

@media (min-width: 44rem) {
  .lab-columns {
    grid-template-columns: 1fr 1fr;
  }
}

.lab-col {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  min-width: 0;
}

.bug-col {
  border-top: 3px solid var(--color-danger);
}

.correct-col {
  border-top: 3px solid var(--color-success);
}

.col-title-bar {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.col-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-sm);
  align-self: flex-start;
}

.tag-danger {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

.tag-success {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.col-title-bar h5 {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.list-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.btn-action {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-danger {
  background: var(--color-danger-bg);
  color: var(--color-danger);
  border-color: var(--color-danger);
  font-weight: 600;
}

.btn-success {
  background: var(--color-success-bg);
  color: var(--color-success);
  border-color: var(--color-success);
  font-weight: 600;
}

.demo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
}

.item-name {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text);
}

.demo-input {
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  background: var(--color-surface);
}

.empty-notice {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-align: center;
  padding: var(--space-sm);
}
</style>
