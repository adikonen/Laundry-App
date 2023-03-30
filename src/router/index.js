import { createRouter, createWebHistory } from 'vue-router'

function doneFirstStepBill(to, from, next) {
  // enter second step without fill first step
  if (! localStorage.getItem('bill.forPerson')) {
    return next({name: 'bill.create'})
  }
  
  return next()
}

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
    },
    {
      path: '/bill',
      name: 'bill.index',
      component: () => import('@/views/Bill/IndexView.vue')
    },
    {
      path: '/bill/create',
      name: 'bill.create',
      component: () => import('@/views/Bill/CreateView.vue')
    },
    {
      path: '/bill/nextstep-create',
      name: 'bill.nextstep-create',
      component: () => import('@/views/Bill/NextStepCreateView.vue'),
      beforeEnter: doneFirstStepBill
    },
    {
      path: '/bill/:bill_id/show',
      name: 'bill.show',
      component: () => import('@/views/Bill/ShowView.vue')
    },
    {
      path: '/bill/:bill_id/edit',
      name: 'bill.edit',
      component: () => import('@/views/Bill/EditView.vue')
    }
  ]
})

export default router
