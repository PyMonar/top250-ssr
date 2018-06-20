import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Movie',
        component: () => import('../components/Movie.vue')
      },
      {
        path: '/top250',
        name: 'Movie',
        component: () => import('../components/Movie.vue')
      }
    ]
  })
}
