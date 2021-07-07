import { createStore } from 'vuex'
import userStore from './modules/user'
import noticeStore from './modules/notice'
import loader from '@/store/modules/loader'
import weatherStore from './modules/weather'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore,
    noticeStore,
    loader,
    weatherStore
  }
})
