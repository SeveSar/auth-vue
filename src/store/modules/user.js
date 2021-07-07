import firebase from 'firebase/app'
import 'firebase/auth'
const userStore = {
  state: {
    user: null
  },
  getters: {
    user: (state) => state.user,
    isUser: (state) => state.user !== null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async createUser ({ commit, dispatch }, { email, password }) {
      try {
        dispatch('setLoading', true, { root: true })
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', res.user.uid)
        dispatch('clearNotice', { root: true })
      } catch (err) {
        console.log(err)
        switch (err.code) {
          case 'auth/email-already-in-use':
            dispatch('setAlert', {
              type: 'error',
              msg: 'The email address is already in use by another account.'
            })
            break
          default:
            dispatch('setAlert', {
              type: 'error',
              msg: 'Something went wrong. Try again'
            })
            break
        }
        throw err
      } finally {
        dispatch('setLoading', false, { root: true })
      }
    },
    async logUser ({ commit, dispatch }, { email, password }) {
      try {
        dispatch('setLoading', true, { root: true })
        const res = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', res.user.uid)
        dispatch('setAlert', {
          type: 'agreed',
          msg: 'Successfully logged in!'
        })
        dispatch('clearNotice', { root: true })
      } catch (err) {
        switch (err.code) {
          case 'auth/invalid-email':
            dispatch('setAlert', {
              type: 'error',
              msg: 'Incorrect e-mail, please check it'
            })
            break
          case 'auth/user-not-found':
            dispatch('setAlert', {
              type: 'error',
              msg: 'No account with that email was found'
            })
            break
          case 'auth/wrong-password':
            dispatch('setAlert', {
              type: 'error',
              msg: 'Incorrect password, please check it'
            })
            break
          default:
            dispatch('setAlert', {
              type: 'error',
              msg: 'Email or password was incorrect'
            })
            break
        }
      } finally {
        dispatch('setLoading', false, { root: true })
      }
    },
    setUser ({ commit }, value) {
      commit('setUser', value)
    }
  }
}

export default userStore
