import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import localCache from '../utils/cache'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    redirect: '/home/pool',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'pool',
        component: () => import('../components/HomePool.vue')
      },
      {
        path: 'person',
        component: () => import('../components/HomePerson.vue')
      },
      {
        path: 'service',
        component: () => import('../components/HomeService.vue')
      },
      {
        path: 'category',
        component: () => import('../components/HomeCategory.vue')
      },
      {
        path: 'order',
        component: () => import('../components/HomeOrder.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login' && !localCache.getCache('token')) {
    return '/login'
  }
})

export default router
