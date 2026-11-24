<!-- src/views/ImportanciaView.vue -->
<script setup>
import { ref } from 'vue';
import SectionLayout from '@/components/ui/SectionLayout.vue';

const sources = [
  { url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Viewport_meta_tag', label: 'MDN Web Docs — Usando a meta tag viewport' },
  { url: 'https://web.dev/responsive-web-design-basics/', label: 'web.dev (Google) — Princípios Básicos de Design Web Responsivo' },
  { url: 'https://www.w3.org/TR/css-device-adapt-1/', label: 'W3C — CSS Device Adaptation Module Level 1' },
];

// Simulador interativo do comportamento da meta viewport
const hasViewportTag = ref(true);
</script>

<template>
  <div class="page-view">
    <SectionLayout
      section-id="importancia"
      number="01"
      title="Importância da Responsividade & Viewport"
      guide-question="Site com media queries mas sem meta tag viewport fica minúsculo no celular. Por quê e o que ela muda?"
      :sources="sources"
    >
      <!-- 1. Explicação Prática -->
      <template #explanation>
        <p>
          O conceito de responsividade web não se resume a reorganizar caixas quando a janela encolhe. Ele parte do entendimento da camada física e lógica dos dispositivos:
        </p>

        <h3>1.1. O Viewport Virtual dos Smartphones (~980px)</h3>
        <p>
          Com a chegada dos primeiros smartphones com navegadores completos (como o iPhone em 2007), a imensa maioria dos sites da internet era projetada exclusivamente para monitores CRT e LCD de 1024×768 pixels.
          Se os navegadores móveis renderizassem esses sites nos escassos 320 pixels de largura da tela do celular, os layouts quebrariam por completo: textos colapsariam em colunas verticais minúsculas e tabelas ficariam deformadas.
        </p>
        <p>
          A solução de engenharia adotada na época pela Apple e depois seguida pelo Google no Android foi criar um <strong>Viewport de Layout Virtual</strong> fixo em cerca de <strong>980 pixels</strong> (no Safari) ou 800-980px (no Chrome).
          O navegador processa o CSS como se estivesse em uma janela de desktop de 980px e, em seguida, aplica um <em>zoom-out</em> automático para fazer todo o conteúdo caber na tela física do aparelho.
        </p>

        <h3>1.2. O Problema das Media Queries sem Meta Tag</h3>
        <p>
          Quando um desenvolvedor escreve regras responsivas com media queries, como:
        </p>
        <pre><code>@media (max-width: 48rem) { /* 768px */
  .coluna { width: 100%; }
}</code></pre>
        <p>
          Se o documento HTML <strong>não declarar a meta tag viewport</strong>, o navegador móvel continuará assumindo que a largura da página é de 980px.
          Como <code>980px > 768px</code>, a condição da media query mobile <strong>nunca é satisfeita</strong>! O celular continuará exibindo a versão desktop completa em miniatura, forçando o usuário a fazer gestos de pinça (<em>pinch-to-zoom</em>) para conseguir ler qualquer linha de texto ou tocar em um botão.
        </p>

        <h3>1.3. A Solução: A Meta Tag Viewport</h3>
        <p>
          A declaração técnica obrigatória no <code>&lt;head&gt;</code> é:
        </p>
        <pre><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></pre>
        <ul>
          <li><code>width=device-width</code>: Instrui o navegador a descartar os 980px virtuais e definir a largura do layout viewport como sendo exatamente igual à largura lógica em pixels CSS do aparelho (ex: 390px em um iPhone 13/14, 412px em um Galaxy S22).</li>
          <li><code>initial-scale=1.0</code>: Estabelece a proporção de escala inicial de 1:1 entre os pixels CSS e os pixels do dispositivo no carregamento da página.</li>
        </ul>
      </template>

      <!-- 2. Exemplo de Código Comentado -->
      <template #code>
        <pre><code>&lt;!-- index.html: Configuração essencial para Mobile-First --&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="pt-BR"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;!-- Informa ao navegador móvel a largura real da tela em pixels CSS --&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;GridLab // Exemplo de Engenharia&lt;/title&gt;
    &lt;link rel="stylesheet" href="style.css"&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;main class="container"&gt;
      &lt;h1&gt;Interface Responsiva&lt;/h1&gt;
      &lt;p&gt;O texto renderiza em tamanho legível imediatamente.&lt;/p&gt;
    &lt;/main&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>

        <pre><code>/* style.css: Arquitetura Mobile-First */
/* Estilo base (sem media query) é SEMPRE para celular */
.container {
  width: 100%;
  padding-inline: 1rem;
  margin-inline: auto;
}

/* Breakpoint Desktop: usa exclusivamente min-width */
@media (min-width: 48rem) { /* 768px */
  .container {
    max-width: 68rem;
    padding-inline: 2.5rem;
  }
}</code></pre>
      </template>

      <!-- Laboratório Interativo: Simulador de Viewport -->
      <template #lab>
        <div class="viewport-simulator-lab">
          <div class="sim-controls">
            <span>Modo de Renderização do Navegador Mobile:</span>
            <div class="sim-btn-group">
              <button
                :class="['btn-sim', { 'active': hasViewportTag }]"
                @click="hasViewportTag = true"
              >
                ✓ COM Meta Viewport (Modo Real)
              </button>
              <button
                :class="['btn-sim', { 'active': !hasViewportTag }]"
                @click="hasViewportTag = false"
              >
                ✕ SEM Meta Viewport (Virtual 980px)
              </button>
            </div>
          </div>

          <div class="phone-frame">
            <div class="phone-notch">
              <span class="notch-speaker"></span>
            </div>
            <div class="phone-screen">
              <div :class="['rendered-page', hasViewportTag ? 'mode-responsive' : 'mode-virtual-980']">
                <header class="dummy-nav">
                  <span class="dummy-logo">GridLab_</span>
                  <span class="dummy-menu">{{ hasViewportTag ? '☰' : 'Home | Seções | Lab | Contato | FAQ | Sobre' }}</span>
                </header>
                <div class="dummy-hero">
                  <h2>Layout {{ hasViewportTag ? 'Responsivo Fluido' : 'Desktop Forçado em 980px' }}</h2>
                  <p>
                    {{ hasViewportTag
                      ? 'Texto perfeitamente legível em 1rem (16px). Os botões têm tamanho de toque adequado e as media queries foram aplicadas.'
                      : 'Texto renderizado em uma página virtual de 980px. Para caber na tela do celular de 375px, o navegador aplicou uma redução de ~62% (zoom out), tornando a fonte microscópica e ilegível sem zoom manual.'
                    }}
                  </p>
                  <button class="dummy-btn">Botão de Ação</button>
                </div>
              </div>
            </div>
            <div class="phone-caption">
              <span>{{ hasViewportTag ? 'Status: Layout Viewport = 375px (Legível)' : 'Status: Layout Viewport = 980px com Zoom Out (Ilegível)' }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- 3. Resposta à Pergunta-Guia -->
      <template #answer>
        <p>
          <strong>Sem a meta viewport, navegadores móveis criam um viewport de layout virtual (~980px), maior que os breakpoints mobile, aplicando zoom out na versão desktop. A tag <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code> iguala o viewport de layout à largura real em pixels CSS do aparelho.</strong>
        </p>
        <p>
          <em>Fundamentação técnica complementar:</em> Mesmo que o desenvolvedor crie regras CSS perfeitamente elaboradas para celulares (ex: <code>@media (max-width: 600px)</code> ou <code>@media (min-width: 48rem)</code>), o motor de renderização (WebKit, Blink, Gecko) consulta a largura do <strong>Layout Viewport</strong> para avaliar as Media Queries. Na ausência da meta tag, esse valor é congelado em ~980px; consequentemente, o navegador julga que a tela é desktop, ignora os estilos móveis e força a página em zoom out microscópico.
        </p>
      </template>
    </SectionLayout>
  </div>
</template>

<style scoped>
.page-view {
  width: 100%;
}

.viewport-simulator-lab {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  align-items: center;
}

.sim-controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  align-items: center;
  width: 100%;
}

.sim-controls span {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.sim-btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  justify-content: center;
}

.btn-sim {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-sim.active {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
  font-weight: 700;
}

.phone-frame {
  width: 320px;
  max-width: 100%;
  height: 440px;
  background: #18181b;
  border-radius: 28px;
  padding: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
}

.phone-notch {
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notch-speaker {
  width: 50px;
  height: 4px;
  background: #3f3f46;
  border-radius: 4px;
}

.phone-screen {
  flex: 1;
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
}

.rendered-page {
  padding: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
}

.mode-responsive {
  font-size: 14px;
}

.mode-virtual-980 {
  /* Simula a página de 980px encolhida na tela de 300px (escala ~0.3) */
  transform: scale(0.35);
  transform-origin: top left;
  width: 860px;
  height: 1100px;
  font-size: 16px;
}

.dummy-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e4e7;
  padding-bottom: 8px;
}

.dummy-logo {
  font-family: monospace;
  font-weight: 700;
  color: var(--color-accent);
}

.dummy-menu {
  font-size: 12px;
  color: #52525b;
}

.dummy-hero h2 {
  font-size: 1.1em;
  margin: 0 0 6px;
}

.dummy-hero p {
  font-size: 0.9em;
  line-height: 1.4;
  color: #3f3f46;
  margin: 0 0 12px;
}

.dummy-btn {
  background: var(--color-accent);
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 600;
}

.phone-caption {
  padding-top: 8px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: #a1a1aa;
}
</style>
