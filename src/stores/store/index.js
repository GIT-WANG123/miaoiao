// src/stores/store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    login({ commit }, userData) {
      commit('setUser', userData)
    }
  }
})