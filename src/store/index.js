import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let apiHost = 'http://localhost:3000'

export function createStore() {
  return new Vuex.Store({
    state: {
      movies: []
    },
    actions: {
      FETCH_MOVIES ({commit, dispatch, state}) {
        return axios.get(apiHost + '/api/movie/top250').then(res => {
          let movies = res.data.subjects
          commit('SET_MOVIES', movies)
        })
      }
    },
    mutations: {
      SET_MOVIES (state, movies) {
        state.movies = movies
      }
    }
  })
}
