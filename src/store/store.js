import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user/user'
import {api} from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  state: {
    loading: false
  },
  getters: {
    loading: state => state.loading
  },
  mutations: {
    SET_LOADING: (state, payload) => state.loading = payload
  },
  actions: {
    index({commit}, endpoint, params) {
      commit('SET_LOADING', true)
      return new Promise((res,rej)=>{
          api.get(endpoint, {params: params})
          .then((response) => {
            res(response.data)
          })
          .catch((error) => {
            rej(error)
          })
          .then(() => {
            commit('SET_LOADING', false)
          })
      });
    },
    create({commit}, payload) {
      commit('SET_LOADING', true)
      return new Promise((res,rej)=>{
          api.post(payload.endpoint, payload.params)
          .then((response) => {
            res(response.data)
          })
          .catch((error) => {
            rej(error)
          })
          .then(() => {
            commit('SET_LOADING', false)
          })
      });
    },
    destroy({commit}, payload) {
      commit('SET_LOADING', true)
      return new Promise((res,rej)=>{
        api.delete(payload.endpoint+'/'+payload.params.id)
        .then((response) => {
          res(response.data)
        })
        .catch((error) => {
          rej(error)
        })
        .then(() => {
          commit('SET_LOADING', false)
        })
    });
    }
  }
})
