import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'
import HomeView from '../views/HomeView.vue'

// Indicador reativo de navegação para a barra de carregamento no header
export const isNavigating = ref(false)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/importancia',
      name: 'importancia',
      component: () => import('../views/ImportanciaView.vue')
    },
    {
      path: '/unidades',
      name: 'unidades',
      component: () => import('../views/UnidadesView.vue')
    },
    {
      path: '/flexbox-grid',
      alias: ['/flexboxgrid', '/flex-grid', '/flexgrid'],
      name: 'flexbox-grid',
      component: () => import('../views/FlexboxGridView.vue')
    },
    {
      path: '/imagens',
      name: 'imagens',
      component: () => import('../views/ImagensView.vue')
    },
    {
      path: '/boas-praticas',
      alias: ['/boaspraticas', '/boas_praticas'],
      name: 'boas-praticas',
      component: () => import('../views/BoasPraticasView.vue')
    },
    {
      path: '/desafio',
      alias: ['/desafio-final', '/desafiofinal'],
      name: 'desafio',
      component: () => import('../views/DesafioView.vue')
    },
    // Fallback: se o usuário digitar uma rota desconhecida, redireciona para a Home evitando tela branca
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(() => {
  isNavigating.value = true
})

router.afterEach(() => {
  setTimeout(() => {
    isNavigating.value = false
  }, 150)
})

// Pré-carregamento pró-ativo em segundo plano (evita atrasos e telas em branco na primeira troca de rota)
if (typeof window !== 'undefined') {
  const prefetchPages = () => {
    import('../views/ImportanciaView.vue')
    import('../views/UnidadesView.vue')
    import('../views/FlexboxGridView.vue')
    import('../views/ImagensView.vue')
    import('../views/BoasPraticasView.vue')
    import('../views/DesafioView.vue')
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(prefetchPages)
  } else {
    setTimeout(prefetchPages, 300)
  }
}

export default router
