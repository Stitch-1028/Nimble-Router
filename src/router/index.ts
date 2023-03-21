import { createRouter, createWebHashHistory } from 'vue-router'
import { ROLER } from '@/configs/user'
import { useUserStore } from '@/stores/user'
import pinia from '@/stores/store'
const user = useUserStore(pinia)
const router = createRouter({
  history: import.meta.env.BASE_URL ? createWebHashHistory(import.meta.env.BASE_URL) : createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: () => {
        return (
          {
            [ROLER.admin]: '/admin',
            [ROLER.projectAdmin]: '/projectAdmin',
            [ROLER.projectLeader]: '/projectLeader',
            [ROLER.user]: '/user'
          }[user.getUserRole as string] || '/user'
        )
      }
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
    },
    // 用户信息
    {
      path: '/userInfo',
      name: 'userInfo',
      component: () => import('../views/userInfo/index.vue')
    },
    // 项目详情
    {
      path: '/projectDetail',
      name: 'projectDetail',
      component: () => import('@/views/projectDetail/index.vue')
    },
    // 资金详情
    {
      path: '/moneyDetail',
      name: 'moneyDetail',
      component: () => import('@/views/moneyDetail/index.vue')
    },
    // 管理员admin
    {
      path: '/admin',
      component: () => import('@/views/admin/layout/index.vue'),
      redirect: '/admin/echarts',
      meta: {
        requireAuth: true
      },
      children: [
        // 项目模块
        {
          path: 'projectModule',
          component: () => import('@/views/admin/projectModule/index.vue'),
          redirect: '/admin/projectModule/projectManage',
          children: [
            // 项目管理
            {
              path: 'projectManage',
              component: () => import('@/views/admin/projectModule/projectManage/index.vue'),
              meta: {
                routerName: '项目模块-项目管理'
              }
            }
          ]
        },
        // 资金模块
        {
          path: 'moneyModule',
          component: () => import('@/views/admin/moneyModule/index.vue'),
          redirect: '/admin/moneyModule/moneyManage',
          children: [
            // 资金管理
            {
              path: 'moneyManage',
              component: () => import('@/views/admin/moneyModule/moneyManage/index.vue'),
              meta: {
                routerName: '资金模块-资金管理'
              }
            }
          ]
        },
        // 数据统计
        {
          path: 'echarts',
          component: () => import('@/views/Echarts/index.vue'),
          meta: {
            routerName: '数据统计'
          }
        },
        // 审批模块
        {
          path: 'approvalModule',
          component: () => import('@/views/admin/approvalModule/index.vue'),
          redirect: '/admin/approvalModule/projectProcess',
          children: [
            // 项目审批
            {
              path: 'projectProcess',
              component: () => import('@/views/admin/approvalModule/projectProcess/index.vue'),
              meta: {
                routerName: '审批模块-项目审批'
              }
            },
            // 资金审批
            {
              path: 'moneyProcess',
              component: () => import('@/views/admin/approvalModule/moneyProcess/index.vue'),
              meta: {
                routerName: '审批模块-资金审批'
              }
            }
          ]
        },
        // 系统管理
        {
          path: 'system',
          component: () => import('@/views/admin/system/index.vue'),
          redirect: '/admin/system/roleList',
          children: [
            {
              path: 'roleList',
              component: () => import('@/views/admin/system/roleList/index.vue'),
              meta: {
                routerName: '系统管理-角色管理'
              }
            },
            // 用户信息管理
            {
              path: 'userInfoManage',
              component: () => import('@/views/admin/system/userInfoManage/index.vue'),
              meta: {
                routerName: '系统管理-用户管理'
              }
            }
          ]
        }
      ]
    },
    // 项目经理
    {
      path: '/projectLeader',
      component: () => import('@/views/projectLeader/layout/index.vue'),
      redirect: '/projectLeader/echarts',
      meta: {
        requireAuth: true
      },
      children: [
        // 项目模块
        {
          path: 'projectModule',
          component: () => import('@/views/projectLeader/projectModule/index.vue'),
          redirect: '/projectLeader/projectModule/projectManage',
          children: [
            // 项目管理
            {
              path: 'projectManage',
              component: () => import('@/views/projectLeader/projectModule/projectManage/index.vue'),
              meta: {
                routerName: '项目模块-项目管理'
              }
            }
          ]
        },
        // 资金模块
        {
          path: 'moneyModule',
          component: () => import('@/views/projectLeader/moneyModule/index.vue'),
          redirect: '/projectLeader/moneyModule/moneyManage',
          children: [
            // 资金管理
            {
              path: 'moneyManage',
              component: () => import('@/views/projectLeader/moneyModule/moneyManage/index.vue'),
              meta: {
                routerName: '资金模块-资金管理'
              }
            }
          ]
        },
        // 数据统计
        {
          path: 'echarts',
          component: () => import('@/views/Echarts/index.vue'),
          meta: {
            routerName: '数据统计'
          }
        }
        // 审批模块
        // {
        //   path: 'approvalModule',
        //   component: () => import('@/views/projectLeader/approvalModule/index.vue'),
        //   redirect: '/projectLeader/approvalModule/projectProcess',
        //   children: [
        //     // 项目审批
        //     {
        //       path: 'projectProcess',
        //       component: () =>
        //         import('@/views/projectLeader/approvalModule/projectProcess/index.vue'),
        //       meta: {
        //         routerName: '审批模块-项目审批'
        //       }
        //     },
        //     // 资金审批
        //     {
        //       path: 'moneyProcess',
        //       component: () =>
        //         import('@/views/projectLeader/approvalModule/moneyProcess/index.vue'),
        //       meta: {
        //         routerName: '审批模块-资金审批'
        //       }
        //     }
        //   ]
        // }
        // 系统管理
        // {
        //   path: 'system',
        //   component: () => import('@/views/projectLeader/system/index.vue'),
        //   redirect: '/projectLeader/system/roleList',
        //   children: [
        //     {
        //       path: 'roleList',
        //       component: () => import('@/views/projectLeader/system/roleList/index.vue'),
        //       meta: {
        //         routerName: '系统管理-角色管理'
        //       }
        //     },
        //     // 用户信息管理
        //     {
        //       path: 'userInfoManage',
        //       component: () => import('@/views/projectLeader/system/userInfoManage/index.vue'),
        //       meta: {
        //         routerName: '系统管理-用户管理'
        //       }
        //     }
        //   ]
        // }
      ]
    },
    // 项目管理员
    {
      path: '/projectAdmin',
      component: () => import('@/views/projectAdmin/layout/index.vue'),
      redirect: '/projectAdmin/echarts',
      meta: {
        requireAuth: true
      },
      children: [
        // 项目模块
        {
          path: 'projectModule',
          component: () => import('@/views/projectAdmin/projectModule/index.vue'),
          redirect: '/projectAdmin/projectModule/projectManage',
          children: [
            // 项目管理
            {
              path: 'projectManage',
              component: () => import('@/views/projectAdmin/projectModule/projectManage/index.vue'),
              meta: {
                routerName: '项目模块-项目管理'
              }
            }
          ]
        },
        // 资金模块
        {
          path: 'moneyModule',
          component: () => import('@/views/projectAdmin/moneyModule/index.vue'),
          redirect: '/projectAdmin/moneyModule/moneyManage',
          children: [
            // 资金管理
            {
              path: 'moneyManage',
              component: () => import('@/views/projectAdmin/moneyModule/moneyManage/index.vue'),
              meta: {
                routerName: '资金模块-资金管理'
              }
            }
          ]
        },
        // 数据统计
        {
          path: 'echarts',
          component: () => import('@/views/Echarts/index.vue'),
          meta: {
            routerName: '数据统计'
          }
        },
        // 审批模块
        {
          path: 'approvalModule',
          component: () => import('@/views/projectAdmin/approvalModule/index.vue'),
          redirect: '/projectAdmin/approvalModule/projectProcess',
          children: [
            // 项目审批
            {
              path: 'projectProcess',
              component: () => import('@/views/projectAdmin/approvalModule/projectProcess/index.vue'),
              meta: {
                routerName: '审批模块-项目审批'
              }
            },
            // 资金审批
            {
              path: 'moneyProcess',
              component: () => import('@/views/projectAdmin/approvalModule/moneyProcess/index.vue'),
              meta: {
                routerName: '审批模块-资金审批'
              }
            }
          ]
        }
        // 系统管理
        // {
        //   path: 'system',
        //   component: () => import('@/views/projectLeader/system/index.vue'),
        //   redirect: '/projectLeader/system/roleList',
        //   children: [
        //     {
        //       path: 'roleList',
        //       component: () => import('@/views/projectLeader/system/roleList/index.vue'),
        //       meta: {
        //         routerName: '系统管理-角色管理'
        //       }
        //     },
        //     // 用户信息管理
        //     {
        //       path: 'userInfoManage',
        //       component: () => import('@/views/projectLeader/system/userInfoManage/index.vue'),
        //       meta: {
        //         routerName: '系统管理-用户管理'
        //       }
        //     }
        //   ]
        // }
      ]
    },
    // 普通员工
    {
      path: '/user',
      component: () => import('@/views/user/layout/index.vue'),
      redirect: '/user/echarts',
      meta: {
        requireAuth: true
      },
      children: [
        // 项目模块
        {
          path: 'projectModule',
          component: () => import('@/views/user/projectModule/index.vue'),
          redirect: '/user/projectModule/projectManage',
          children: [
            // 项目管理
            {
              path: 'projectManage',
              component: () => import('@/views/user/projectModule/projectManage/index.vue'),
              meta: {
                routerName: '项目模块-项目管理'
              }
            }
          ]
        },
        // 资金模块
        {
          path: 'moneyModule',
          component: () => import('@/views/user/moneyModule/index.vue'),
          redirect: '/user/moneyModule/moneyManage',
          children: [
            // 资金管理
            {
              path: 'moneyManage',
              component: () => import('@/views/user/moneyModule/moneyManage/index.vue'),
              meta: {
                routerName: '资金模块-资金管理'
              }
            }
          ]
        },
        // 数据统计
        {
          path: 'echarts',
          component: () => import('@/views/Echarts/index.vue'),
          meta: {
            routerName: '数据统计'
          }
        }
        // 审批模块
        // {
        //   path: 'approvalModule',
        //   component: () => import('@/views/projectLeader/approvalModule/index.vue'),
        //   redirect: '/projectLeader/approvalModule/projectProcess',
        //   children: [
        //     // 项目审批
        //     {
        //       path: 'projectProcess',
        //       component: () =>
        //         import('@/views/projectLeader/approvalModule/projectProcess/index.vue'),
        //       meta: {
        //         routerName: '审批模块-项目审批'
        //       }
        //     },
        //     // 资金审批
        //     {
        //       path: 'moneyProcess',
        //       component: () =>
        //         import('@/views/projectLeader/approvalModule/moneyProcess/index.vue'),
        //       meta: {
        //         routerName: '审批模块-资金审批'
        //       }
        //     }
        //   ]
        // }
        // 系统管理
        // {
        //   path: 'system',
        //   component: () => import('@/views/projectLeader/system/index.vue'),
        //   redirect: '/projectLeader/system/roleList',
        //   children: [
        //     {
        //       path: 'roleList',
        //       component: () => import('@/views/projectLeader/system/roleList/index.vue'),
        //       meta: {
        //         routerName: '系统管理-角色管理'
        //       }
        //     },
        //     // 用户信息管理
        //     {
        //       path: 'userInfoManage',
        //       component: () => import('@/views/projectLeader/system/userInfoManage/index.vue'),
        //       meta: {
        //         routerName: '系统管理-用户管理'
        //       }
        //     }
        //   ]
        // }
      ]
    },
    // 重定向
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})
router.beforeEach((to, from) => {
  console.log('to', to)
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const token = localStorage.getItem('token')
    if (!token) {
      return '/login'
    }
  }
})
export default router
