import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let apiHost = 'http://localhost:3000'

export function createStore() {
  return new Vuex.Store({
    state: {
      movies: [],
      us_box: []
    },
    actions: {
      FETCH_MOVIES ({commit, dispatch, state}) {
        return axios.get(apiHost + '/api/movie/top250').then(res => {
          let movies = res.data.subjects
          commit('SET_MOVIES', movies)
        })
      },
      FETCH_US ({commit, dispatch, state}) {
        return axios.get(apiHost + '/api/movie/us_box').then(res => {
          let us_box = res.data.subjects
          commit('SET_US', us_box)
        })
      }
    },
    mutations: {
      SET_MOVIES (state, movies) {
        state.movies = movies
      },
      SET_US (state, us_box) {
        state.us_box = us_box
      }
    }
  })
}
