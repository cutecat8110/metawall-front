import { createRouter, createWebHashHistory } from 'vue-router'
// vue-axios
import http, { errorMessage } from '@/services/http'

import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'posts_wall',
        component: () => import('@/views/PostsWall.vue')
      },
      {
        path: 'post',
        name: 'post',
        component: () => import('@/views/Post.vue')
      },
      {
        path: 'profile/:p',
        name: 'profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: 'follow_list',
        name: 'follow_list',
        component: () => import('@/views/FollowList.vue')
      },
      {
        path: 'like_list',
        name: 'like_list',
        component: () => import('@/views/LikeList.vue')
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/Setting.vue'),
        children: [
          {
            path: '',
            name: 'account',
            component: () => import('@/views/Account.vue')
          },
          {
            path: 'security',
            name: 'security',
            component: () => import('@/views/Security.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/sign_in',
    name: 'sign_in',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/sign_up',
    name: 'sign_up',
    component: () => import('../views/SignUp.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to) => {
  if (['sign_in', 'sign_up'].includes(to.name)) return true
  const authorization = localStorage.getItem('authorization')
  if (!authorization) return { name: 'sign_in' }
  store.commit('headers', { headers: { authorization } })
  try {
    await http.get(`${process.env.VUE_APP_API}/user/checkLogin`)
    return true
  } catch (error) {
    store.commit('authError', errorMessage(error))
    return { name: 'sign_in' }
  }
})

export default router
