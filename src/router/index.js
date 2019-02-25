import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'GoodList'
      }
    },
    {
      path: '/goods',
      name: 'GoodList',
      component: () => import('@/views/GoodsList')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/Cart')
    },
    {
      path: '/address',
      name: 'Address',
      component: () => import('@/views/Address')
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: () => import('@/views/OrderConfirm')
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: () => import('@/views/OrderSuccess')
    }
  ]
})
