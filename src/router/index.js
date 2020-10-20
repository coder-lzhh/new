import Vue from 'vue'
import VueRouter from 'vue-router'
const home = () => import('../views/home/home.vue')
const category = () => import('../views/category/category.vue')
const shopcart = () => import('../views/shopcart/shopcart.vue')
const profile = () => import('../views/profile/profile.vue')
const collect = () => import('../views/collect/collect.vue')
const detail = () => import('../views/detail/detail')
const watch = () => import('../views/watch/watch')
const willtake = () => import('../views/willtake/willtake')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/shopcart',
    component: shopcart
  },
  {
    path: '/profile',
    component: profile,
  },

  {
    path: '/collect',
    component: collect
  },
  {
    path: '/watch',
    component: watch
  },
  {
    path: '/willtake',
    component: willtake
  },
  {
    path: '/detail/:iid',
    component: detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
