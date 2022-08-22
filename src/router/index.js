import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import( '../views/cart/index.vue')
  },
  {
    path: '/topic',
    name: 'topic',
    component: () => import( '../views/topic/index.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import( '../views/category/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path:'/search',
    name:'search',
    component:()=> import('../views/home/search.vue')
  },
  {
    path:'/newsgoty/:id',
    name:'newsgoty',
    component:()=> import('../views/home/newsgoty.vue')
  },
  {
    path:'/map',
    name:'map',
    component:()=> import('../views/home/map.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import( '../views/mine/index.vue')
  },
]

const router = new VueRouter({
  routes
})

// 导入nprogress
import NProgress from 'nprogress'
// 导入nprogress的样式
import 'nprogress/nprogress.css'
// 定义路由导航前置守卫
router.beforeEach((to,from,next)=>{
  NProgress.start()
  next()
})
// 定义路由导航后置守卫
router.afterEach((to,from)=>{
  NProgress.done()

})
export default router
