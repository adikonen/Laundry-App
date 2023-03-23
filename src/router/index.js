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
    },
    {
      path: '/clothes/:clothes_id/edit',
      name: 'clothes.edit',
      component: () => import('@/views/Clothes/EditView.vue')
    }
  ]
})

export default router
