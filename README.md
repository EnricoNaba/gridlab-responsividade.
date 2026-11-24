# GridLab

Guia interativo de responsividade e desenvolvimento web front-end voltado para estudantes de níveis iniciante e intermediário.
O projeto combina conceitos teóricos de design responsivo com laboratórios executados em tempo real, permitindo a experimentação prática de unidades CSS, layouts modernos, métricas de performance e ciclo de vida do Virtual DOM.

![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-4.x-ffd859?style=flat-square)
![Vue Router](https://img.shields.io/badge/Vue_Router-4.x-4FC08D?style=flat-square)
![Node](https://img.shields.io/badge/Node-%5E22.18.0_%7C%7C_%3E%3D24.12.0-339933?style=flat-square&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Deploy](https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## Demonstração

> **Site em produção:** [https://gridlab-responsividade.vercel.app](https://gridlab-responsividade.vercel.app)

<!-- Substitua o placeholder abaixo por um screenshot ou GIF da interface -->
![Demonstração do GridLab](./public/favicon.ico)

---

## Funcionalidades

- **Laboratórios Interativos em Tempo Real:**
  - **Conversor de Unidades:** Cálculo dinâmico e visual entre `rem`, `em`, `%` e `px` sincronizado com o tamanho de fonte raiz.
  - **Grid auto-fit:** Contêiner com redimensionamento contínuo por slider, exibindo gatilhos matemáticos de quebra de colunas sem media queries.
  - **Simulador de Cumulative Layout Shift (CLS):** Comparativo lado a lado de carregamento sob rede lenta demonstrando o impacto da reserva de dimensões e `aspect-ratio`.
  - **Reconciliação de Listas (`v-for`):** Demonstração prática do algoritmo de *patch in-place* e a importância de chaves únicas (`:key`).
- **Monitor de Viewport (Lab 1):** Componente flutuante com ouvinte de redimensionamento que exibe a largura exata em pixels e a faixa de breakpoint ativa (`xs`, `sm`, `md`, `lg`).
- **Progresso de Leitura:** Indicador percentual de conclusão das seções com persistência no armazenamento local (`localStorage`).
- **Integração com API Externa:** Módulo de consulta de metadados de repositórios públicos via GitHub REST API utilizando Pinia.
- **Validação de Desafio:** Formulário reativo para conferência de resposta técnica com feedback contextual imediato.

---

## Tecnologias

- **Framework Principal:** [Vue 3](https://vuejs.org/) (Composition API com `<script setup>`)
- **Gerenciamento de Estado:** [Pinia](https://pinia.vuejs.org/)
- **Roteamento SPA:** [Vue Router](https://router.vuejs.org/) (carregamento dinâmico sob demanda)
- **Ferramenta de Build:** [Vite](https://vitejs.dev/)
- **Ferramentas de Desenvolvimento:** `@vitejs/plugin-vue`, `vite-plugin-vue-devtools`

---

## Como Rodar Localmente

### Pré-requisitos

- **Node.js:** versão `^22.18.0` ou `>=24.12.0`
- **Gerenciador de Pacotes:** `npm`

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/EnricoNaba/gridlab-responsividade.git

# 2. Acesse a pasta do projeto
cd gridlab-responsividade

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento local no Vite |
| `npm run build` | Compila os ativos e gera o pacote otimizado de produção em `dist/` |
| `npm run preview` | Executa um servidor local para inspecionar os arquivos da pasta `dist/` |

---

## Estrutura do Projeto

```
src/
├── assets/
│   └── tokens.css               # Variáveis CSS (:root) e regras base mobile-first
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue        # Cabeçalho responsivo (vira botão no celular)
│   │   └── ViewportBadge.vue    # Indicador fixo de largura (px) e breakpoint ativo
│   ├── ui/
│   │   └── SectionLayout.vue    # Template padrão das 4 partes obrigatórias de cada seção
│   └── labs/
│       ├── UnitConverterLab.vue # Laboratório de conversão rem / em / % -> px
│       ├── GridContainerLab.vue # Laboratório de Grid auto-fit com controle deslizante
│       └── ClsImageLab.vue      # Laboratório de atraso de imagem e CLS
├── services/
│   └── api.js                   # Função de consulta à API do GitHub
├── stores/
│   └── useGuideStore.js         # Store Pinia (progresso, baseFontSize e dados da API)
├── views/                       # Páginas carregadas sob demanda via Vue Router
│   ├── HomeView.vue
│   ├── ImportanciaView.vue
│   ├── UnidadesView.vue
│   ├── FlexboxGridView.vue
│   ├── ImagensView.vue
│   ├── BoasPraticasView.vue
│   └── DesafioView.vue
├── router/
│   └── index.js                 # Configuração de rotas com lazy loading
├── App.vue
└── main.js
```

---

## Roadmap / Próximos Passos

- [ ] Adicionar modo escuro (*dark mode*)
- [ ] Adicionar testes unitários com Vitest
- [ ] Implementar PWA com Service Worker para uso offline
- [ ] Adicionar animações de transição entre rotas
- [ ] Expandir laboratório de Grid para suportar `grid-template-areas`

---

## Autor e Licença

- **Autor:** Enrico Augusto Pereira Naba ([@EnricoNaba](https://github.com/EnricoNaba))
- **Deploy:** [https://gridlab-responsividade.vercel.app](https://gridlab-responsividade.vercel.app)
- **Licença:** MIT — sinta-se livre para estudar, adaptar e distribuir com atribuição.

