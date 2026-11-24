<!-- src/views/UnidadesView.vue -->
<script setup>
import SectionLayout from '@/components/ui/SectionLayout.vue';
import UnitConverterLab from '@/components/labs/UnitConverterLab.vue';

const sources = [
  { url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/length', label: 'MDN Web Docs — Valores e Unidades CSS (<length>)' },
  { url: 'https://css-tricks.com/confused-about-rem-and-em/', label: 'CSS-Tricks — Confused About REM and EM?' },
  { url: 'https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html', label: 'W3C WAI — WCAG 2.1 Critério 1.4.4: Redimensionamento de Texto' },
];
</script>

<template>
  <div class="page-view">
    <SectionLayout
      section-id="unidades"
      number="02"
      title="Unidades Relativas vs Absolutas"
      guide-question="Usuário aumenta fonte no navegador: px não muda e rem aumenta. Por que essa diferença acontece?"
      :sources="sources"
    >
      <!-- 1. Explicação Prática -->
      <template #explanation>
        <p>
          A escolha das unidades no CSS afeta diretamente a flexibilidade, a manutenibilidade e, acima de tudo, a <strong>acessibilidade (a11y)</strong> de uma aplicação web.
        </p>

        <h3>2.1. Unidades Absolutas (px) e a Barreira de Acessibilidade</h3>
        <p>
          O pixel (<code>px</code>) é uma unidade estática. No CSS, <code>1px</code> equivale estritamente a 1/96 de uma polegada física em uma tela de densidade padrão.
          Quando um desenvolvedor fixa o tamanho de texto com <code>font-size: 16px</code>, ele está congelando aquele valor de forma arbitrária.
        </p>
        <p>
          Milhões de pessoas com baixa visão, astigmatismo, presbiopia ou preferências ergonômicas configuram o tamanho padrão de fonte do seu navegador ou sistema operacional para <strong>20px, 24px ou mais</strong>.
          Quando uma página define tipografia em <code>px</code>, o navegador é obrigado pela especificação CSS a ignorar a preferência do usuário e manter o texto engessado no valor fixo especificado.
        </p>

        <h3>2.2. Unidades Relativas: rem, em e %</h3>
        <ul>
          <li>
            <strong><code>rem</code> (Root EM):</strong> É relativo exclusivamente ao <code>font-size</code> do elemento raiz (<code>&lt;html&gt;</code>).
            Por padrão em todos os navegadores comerciais, a raiz herda a configuração do usuário (16px). Se o usuário aumentar a preferência para 24px, <code>1rem</code> passa imediatamente a valer 24px, <code>1.5rem</code> passa para 36px e assim por diante. Toda a interface escala proporcionalmente sem distorções!
          </li>
          <li>
            <strong><code>em</code>:</strong> É relativo ao <code>font-size</code> do elemento pai (para propriedades de tipografia) ou do próprio elemento (para <code>padding</code>, <code>margin</code>, <code>border-radius</code>).
            É ideal para criar componentes modulares e auto-escaláveis, como botões e badges: se você alterar o <code>font-size</code> de um botão, seu espaçamento interno definido em <code>em</code> aumentará na mesma proporção automaticamente.
          </li>
          <li>
            <strong>Porcentagem (<code>%</code>):</strong> Relativa à dimensão do elemento pai direto. Em <code>font-size</code>, <code>100%</code> equivale a <code>1em</code>.
          </li>
        </ul>

        <h3>2.3. Diretriz WCAG 2.1 (Critério de Sucesso 1.4.4)</h3>
        <p>
          As Diretrizes de Acessibilidade para Conteúdo Web (WCAG 2.1 - Nível AA) estipulam que qualquer texto deve poder ser redimensionado pelo usuário em até <strong>200%</strong> sem auxílio de tecnologias assistivas e sem perda de conteúdo ou quebra de funcionalidade. O uso de <code>rem</code> é o pilar técnico para atender a esse critério.
        </p>
      </template>

      <!-- 2. Exemplo de Código Comentado -->
      <template #code>
        <pre><code>/* ==========================================================================
     ARQUITETURA DE UNIDADES RELATIVAS (Boas Práticas de Engenharia)
     ========================================================================== */

  /* 1. Nunca fixe font-size em px no :root ou html!
     Deixe o navegador herdar as preferências do usuário (padrão: 16px). */
  :root {
    --space-sm: 0.5rem;   /* 8px no padrão, 12px se o usuário usar raiz 24px */
    --space-md: 1rem;     /* 16px no padrão, 24px com ampliação */
    --space-lg: 1.5rem;   /* 24px no padrão, 36px com ampliação */
  }

  /* 2. Tipografia e espaçamentos globais sempre em rem */
  h1 {
    font-size: 2rem;     /* 32px padrão */
    line-height: 1.2;
    margin-bottom: var(--space-md);
  }

  p {
    font-size: 1rem;     /* 16px padrão */
    line-height: 1.6;
  }

  /* 3. Componentes auto-escaláveis com em
     O padding do botão usa 'em' para crescer proporcionalmente se a fonte mudar! */
  .btn-escalavel {
    font-size: 1rem;
    padding: 0.5em 1.25em; /* Se font-size subir para 1.5rem, o padding cresce junto */
    border-radius: 0.25em;
  }

  .btn-large {
    font-size: 1.25rem; /* O padding aumentará automaticamente sem reescrever padding */
  }</code></pre>
      </template>

      <!-- Laboratório Interativo: Lab 2 -->
      <template #lab>
        <UnitConverterLab />
      </template>

      <!-- 3. Resposta à Pergunta-Guia -->
      <template #answer>
        <p>
          <strong>px ignora a preferência de fonte raiz do usuário. Já rem (root em) é relativo ao font-size do elemento &lt;html&gt;, que herda a configuração do navegador (padrão 16px). Se o usuário muda para 24px, 1rem passa a valer 24px e escala todo o texto proporcionalmente.</strong>
        </p>
        <p>
          <em>Detalhamento técnico:</em> O pixel CSS é uma unidade física calibrada (1/96in) que não possui ligação com a cascata da árvore do DOM nem com as preferências de acessibilidade do sistema do usuário. Em contrapartida, o <code>rem</code> se ancora dinamicamente no elemento <code>&lt;html&gt;</code>. Ao respeitar a configuração nativa do navegador sem sobrescrever <code>html { font-size: 16px; }</code> com valor estático, a interface web torna-se verdadeiramente elástica e acessível a usuários com deficiência visual.
        </p>
      </template>
    </SectionLayout>
  </div>
</template>

<style scoped>
.page-view {
  width: 100%;
}
</style>
