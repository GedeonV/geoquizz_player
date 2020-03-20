import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Game from '../views/Game.vue'
import Leaderboard from '../views/Leaderboard.vue'
import Play from '../views/Play.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/play',
    name: 'Play',
    component: Play
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/game/:id',
    name: 'gameID',
    component: Game
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
