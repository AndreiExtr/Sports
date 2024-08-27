import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SportPage from '../views/SportPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/sport/:sportId',
    name: 'SportPage',
    component: SportPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
