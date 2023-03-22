import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/clothes/create',
      name: 'clothes.create',
      component: () => import('@/views/Clothes/CreateView.vue')
    },
    {
      path: '/',
      name: 'clothes.index',
      component: () => import('@/views/Clothes/IndexView.vue')
    }
  ]
})

export default router
