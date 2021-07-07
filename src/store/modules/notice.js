const noticeStore = {
  state: {
    alert: null
  },
  getters: {
    alert: (state) => state.alert
  },
  mutations: {
    setAlert (state, payload) {
      state.alert = payload
    }
  },
  actions: {
    setAlert ({ commit }, alert) {
      commit('setAlert', alert)
    },
    clearNotice ({ commit }) {
      commit('setAlert', null)
    }
  }
}
export default noticeStore
