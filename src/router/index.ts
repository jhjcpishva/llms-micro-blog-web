import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/auth/login',
      name:'login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/auth/callback',
      name:'callback',
      component: () => import('../views/auth/CallbackView.vue'),
    },
  ],
})
export default router
