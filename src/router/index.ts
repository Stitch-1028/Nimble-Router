import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: import.meta.env.BASE_URL ? createWebHashHistory(import.meta.env.BASE_URL) : createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    // 登录
    {
      path: '/login',
      component: () => import('../views/login/index.vue')
    },
    // 注册
    {
      path: '/register',
      component: () => import('../views/register/index.vue')
    },
    // 找回密码
    {
      path: '/getBack',
      component: () => import('../views/getBack/index.vue')
    }
  ]
})

export default router
