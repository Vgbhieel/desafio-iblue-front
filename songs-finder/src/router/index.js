import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pesquisar from '../views/Pesquisar.vue'
import Relatorio from '../views/Relatorio.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pesquisar',
    name: 'Pesquisar',
    component: Pesquisar
  },
  {
    path: '/relatorio',
    name: 'Relatorio',
    component: Relatorio
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
