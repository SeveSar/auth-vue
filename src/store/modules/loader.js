const loadingStore = {
  state: {
    loading: false
  },
  getters: {
    loading: state => state.loading
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    setLoading ({ commit }, value) {
      commit('setLoading', value)
    }
  }
}
export default loadingStore
