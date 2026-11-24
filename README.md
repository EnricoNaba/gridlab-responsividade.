# GridLab — Guia Interativo de Responsividade Web

Aplicação web educativa e interativa desenvolvida em **Vue 3** para ensinar e demonstrar, na prática, conceitos fundamentais de design responsivo, unidades relativas, layouts fluidos, performance visual e arquitetura front-end moderna.

- **Aplicação online:** [gridlab-responsividade.vercel.app](https://gridlab-responsividade.vercel.app)
- **Código-fonte:** [github.com/EnricoNaba/gridlab-responsividade](https://github.com/EnricoNaba/gridlab-responsividade)

---

## Arquitetura do Guia e Laboratórios

O conteúdo está organizado em **cinco módulos temáticos** e uma **rota de desafio prático**. Cada seção segue uma estrutura padronizada em quatro etapas (conceito teórico, experimento em tempo real, exemplo técnico e validação de progresso):

1. **Módulo 01 — Importância e Viewport**
   Explica a abordagem *mobile-first* e o papel da tag `<meta name="viewport">`. Conta com o **Monitor de Viewport**, um componente reativo que lê o redimensionamento da tela em tempo real e indica a largura exata em `px` junto ao breakpoint ativo (`xs`, `sm`, `md`, `lg`).
2. **Módulo 02 — Unidades CSS**
   Compara unidades absolutas (`px`) e relativas (`rem`, `em`, `%`). Inclui o **Conversor de Unidades**, sincronizado dinamicamente com o tamanho de fonte raiz (`html`) para demonstrar escala tipográfica proporcional.
3. **Módulo 03 — Flexbox e Grid**
   Apresenta fluxos unidimensionais e bidimensionais e grids responsivos sem *media queries* usando `repeat(auto-fit, minmax())`. No **Laboratório de Grid**, um controle deslizante altera a largura do contêiner continuamente e exibe os gatilhos matemáticos de quebra de colunas.
4. **Módulo 04 — Imagens Responsivas e Performance**
   Aborda a prevenção de deslocamento cumulativo de layout (CLS) e a reserva de espaço com `aspect-ratio`. O **Simulador de CLS** exibe um comparativo lado a lado sob simulação de rede lenta, evidenciando o impacto visual da ausência de dimensões definidas.
5. **Módulo 05 — Boas Práticas em Vue**
   Reúne padrões de organização de projeto, *Design Tokens* globais em `:root`, carregamento de rotas sob demanda (*lazy loading*), persistência de progresso no `localStorage` via **Pinia**, consumo da **GitHub REST API** e uma demonstração prática do algoritmo de reconciliação do Virtual DOM (`v-for` com `:key`).
6. **Módulo 06 — Desafio Final**
   Avaliação prática que exige a aplicação dos conceitos estudados nos laboratórios, validada por um formulário reativo com retorno técnico imediato.

---

## Stack Tecnológica e Padrões

- **Framework:** Vue 3 (Composition API com `<script setup>`)
- **Roteamento:** Vue Router (rotas carregadas sob demanda / *lazy loading*)
- **Estado Global:** Pinia (gerenciamento de progresso e cache de requisições)
- **Build & Dev Server:** Vite (`@vitejs/plugin-vue`, `vite-plugin-vue-devtools`)
- **Estilização:** CSS puro estruturado em *Mobile-First* (`min-width`), unidades relativas (`rem`) e variáveis CSS (`:root`)
- **Integração Externa:** Fetch API conectada à GitHub REST API
- **Deploy:** Vercel

---

## Estrutura de Pastas

```text
src/
├── assets/
│   └── tokens.css               # Design Tokens (:root) e estilos base mobile-first
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue        # Navegação responsiva adaptável para mobile
│   │   └── ViewportBadge.vue    # Monitor flutuante de largura (px) e breakpoint
│   ├── ui/
│   │   └── SectionLayout.vue    # Estrutura padrão das 4 etapas de cada módulo
│   └── labs/
│       ├── UnitConverterLab.vue # Laboratório de conversão rem / em / % -> px
│       ├── GridContainerLab.vue # Laboratório de Grid auto-fit com slider
│       └── ClsImageLab.vue      # Simulador comparativo de CLS em rede lenta
├── services/
│   └── api.js                   # Serviço de consulta à API pública do GitHub
├── stores/
│   └── useGuideStore.js         # Store Pinia (progresso, baseFontSize e dados da API)
├── views/                       # Páginas da aplicação (lazy loaded)
├── router/
│   └── index.js                 # Definição de rotas da SPA
├── App.vue
└── main.js

Como Executar Localmente

# 1. Clone o repositório
git clone [https://github.com/EnricoNaba/gridlab-responsividade.git](https://github.com/EnricoNaba/gridlab-responsividade.git)

# 2. Acesse o diretório do projeto
cd gridlab-responsividade

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev

Após iniciar, acesse o endereço local exibido no terminal (por padrão, http://localhost:5173).


Autor
Desenvolvido por Enrico Augusto Pereira Naba (@EnricoNaba).