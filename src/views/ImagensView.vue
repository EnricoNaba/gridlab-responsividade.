<!-- src/views/ImagensView.vue -->
<script setup>
import SectionLayout from '@/components/ui/SectionLayout.vue';
import ClsImageLab from '@/components/labs/ClsImageLab.vue';

const sources = [
  { url: 'https://web.dev/articles/cls', label: 'web.dev (Google) — Cumulative Layout Shift (CLS) Explicado' },
  { url: 'https://developer.mozilla.org/pt-BR/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images', label: 'MDN Web Docs — Guia de Imagens Responsivas' },
  { url: 'https://web.dev/optimize-cls/', label: 'web.dev — Melhores Práticas para Eliminar Layout Shifts' },
];
</script>

<template>
  <div class="page-view">
    <SectionLayout
      section-id="imagens"
      number="04"
      title="Imagens Responsivas & Performance (CLS)"
      guide-question="Imagem sem width/height empurra o texto ao carregar. Por que ocorre e qual métrica do Google mede isso?"
      :sources="sources"
    >
      <!-- 1. Explicação Prática -->
      <template #explanation>
        <p>
          As imagens são responsáveis por mais de metade da carga de tráfego de dados na web mundial.
          Em redes celulares instáveis, carregar imagens sem a devida engenharia gera frustração e degradação das métricas vitais da página.
        </p>

        <h3>4.1. Imagens Responsivas: picture, srcset e sizes</h3>
        <ul>
          <li>
            <strong>Atributo <code>srcset</code>:</strong> Permite fornecer uma lista de diferentes arquivos de imagem com suas respectivas larguras em pixels reais (ex: <code>foto-400.jpg 400w, foto-800.jpg 800w</code>). O próprio navegador, sabendo a densidade de pixels da tela (DPR) e a velocidade da rede, escolhe a versão mais leve e adequada.
          </li>
          <li>
            <strong>Atributo <code>sizes</code>:</strong> Informa ao navegador qual será a largura de exibição da imagem no layout antes que o CSS seja baixado e interpretado (ex: <code>(min-width: 48rem) 50vw, 100vw</code>).
          </li>
          <li>
            <strong>Elemento <code>&lt;picture&gt;</code>:</strong> Usado para <em>Direção de Arte</em> (cortar imagens de formas diferentes para mobile e desktop) ou para suporte a formatos modernos de alta compressão como <strong>AVIF</strong> e <strong>WebP</strong> com fallback transparente para JPEG/PNG.
          </li>
        </ul>

        <h3>4.2. Por que a Imagem sem Dimensões Empurra o Layout?</h3>
        <p>
          Quando o navegador analisa o HTML (parsing), ele encontra a tag <code>&lt;img src="..."&gt;</code> e dispara uma requisição HTTP assíncrona.
          Enquanto a imagem viaja pela rede (o que pode levar de centenas de milissegundos a vários segundos), o navegador continua montando o layout e a árvore de renderização.
        </p>
        <p>
          Se a tag não possui os atributos <code>width</code> e <code>height</code>, o navegador desconhece totalmente as dimensões do arquivo. Ele então <strong>reserva 0px de altura</strong> para a imagem e desenha o texto e os botões logo abaixo dela.
          Quando o último byte da imagem é recebido e decodificado, o navegador recalcula o layout bruscamente (<em>reflow</em>), empurrando todo o texto para baixo.
        </p>

        <h3>4.3. A Métrica do Google: CLS (Cumulative Layout Shift)</h3>
        <p>
          O <strong>CLS (Cumulative Layout Shift)</strong> é uma das três métricas oficiais do <strong>Google Core Web Vitals</strong> (ao lado de LCP e INP).
          O CLS calcula a pontuação de instabilidade visual multiplicando a fração de impacto pela fração de distância percorrida pelo elemento deslocado.
        </p>
        <ul>
          <li><strong>CLS &le; 0.1:</strong> Bom (Excelente experiência do usuário, sem saltos perceptíveis).</li>
          <li><strong>0.1 &lt; CLS &le; 0.25:</strong> Precisa de melhorias.</li>
          <li><strong>CLS &gt; 0.25:</strong> Pobre / Ruim (Penalização no ranking de busca do Google SEO e alta taxa de rejeição).</li>
        </ul>
        <p>
          <strong>A Solução Definitiva:</strong> Declarar <code>width</code> e <code>height</code> no HTML! Os navegadores modernos calculam automaticamente a propriedade CSS interna <code>aspect-ratio: width / height</code> e reservam a caixa vazia exata antes do download começar, garantindo <strong>CLS = 0</strong>!
        </p>
      </template>

      <!-- 2. Exemplo de Código Comentado -->
      <template #code>
        <pre><code>&lt;!-- =========================================================================
       IMAGEM RESPONSIVA COM ZERO CLS E DIREÇÃO DE ARTE
       ========================================================================= --&gt;

  &lt;!-- 1. Uso do elemento &lt;picture&gt; com formatos modernos e dimensões explícitas --&gt;
  &lt;picture&gt;
    &lt;!-- Formato AVIF (maior compressão para navegadores modernos) --&gt;
    &lt;source srcset="hero-mobile.avif 400w, hero-desktop.avif 800w"
            sizes="(min-width: 48rem) 50vw, 100vw"
            type="image/avif"&gt;

    &lt;!-- Formato WebP (ótimo suporte) --&gt;
    &lt;source srcset="hero-mobile.webp 400w, hero-desktop.webp 800w"
            sizes="(min-width: 48rem) 50vw, 100vw"
            type="image/webp"&gt;

    &lt;!-- Imagem padrão de fallback com width e height explícitos para reservar espaço! --&gt;
    &lt;img src="hero-fallback.jpg"
         width="800"
         height="400"
         loading="lazy"
         decoding="async"
         alt="Ilustração técnica do caderno de engenharia"
         class="responsive-img"&gt;
  &lt;/picture&gt;</code></pre>

        <pre><code>/* Regra CSS padrão essencial: mantém fluidez sem quebrar a proporção */
  .responsive-img {
    width: 100%;
    height: auto;
    display: block;
  }</code></pre>
      </template>

      <!-- Laboratório Interativo: Lab 4 -->
      <template #lab>
        <ClsImageLab />
      </template>

      <!-- 3. Resposta à Pergunta-Guia -->
      <template #answer>
        <p>
          <strong>Sem width e height no HTML, o navegador não sabe a proporção antes do download e reserva 0px de altura, renderizando o texto logo abaixo. Ao carregar, o layout é deslocado. A métrica do Core Web Vitals que mede isso é o CLS (Cumulative Layout Shift).</strong>
        </p>
        <p>
          <em>Fundamentação técnica adicional:</em> Ao informar os atributos numéricos <code>width</code> e <code>height</code> no elemento <code>&lt;img&gt;</code>, o motor do navegador infere a razão de aspecto intrínseca (<em>intrinsic aspect-ratio</em>). Isso permite ao mecanismo de layout alocar o espaço vertical exato na grade de renderização imediatamente durante o primeiro passe de layout, antes mesmo do primeiro byte da imagem trafegar pela rede, mantendo a pontuação de CLS em 0.00.
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
