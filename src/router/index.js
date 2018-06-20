import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Movie',
      component: () => import('../components/Movie.vue')
    }
  ]
})
