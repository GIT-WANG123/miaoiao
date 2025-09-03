import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../views/HomeView.vue'
import Detail from '@/views/movie/detail.vue'
// router/index.js
const routes = [
  {
    path: '/movie',
    component: () => import('@/views/movie/index.vue'),
    redirect: '/movie/nowplaying',
    children: [
      {
        path: 'city',
        component: () => import('@/components/city/index.vue')
      },
      {
        path: 'nowplaying',
        component: () => import('@/components/nowplaying/index.vue')
      },
      {
        path: 'comingsoon', // 修正：coningsoon → comingsoon
        component: () => import('@/components/comingsoon/index.vue')
      },
      {
        path: 'search',
        component: () => import('@/components/search/index.vue')
      }
    ]
  },
  {
    path: '/cinema',
    name: 'cinema',
    component: () => import('@/views/cinema/index.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/mine/index.vue')
  },
  {
    path:'/movie/detail',
    name:'detail',
  component:()=>import('@/views/movie/detail.vue')
      
    
  }
]


const router = createRouter({
  // 修复这里：使用空字符串或 '/' 作为基础路径
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes
})

export default router