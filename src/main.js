import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle, faCheckCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css'
import firebase from 'firebase/app'

library.add(faTimesCircle, faCheckCircle, faSearch)
var firebaseConfig = {
  apiKey: 'AIzaSyACRSjffWOEjIBwkjZQyjLnHlxTaoDTtUo',
  authDomain: 'auth-vue-847a0.firebaseapp.com',
  projectId: 'auth-vue-847a0',
  storageBucket: 'auth-vue-847a0.appspot.com',
  messagingSenderId: '327644079512',
  appId: '1:327644079512:web:bb312387c2c26e7dfab7ed'
}
firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('setUser', user.uid)
    console.log(store.getters.user)
  }
})
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store).use(router).mount('#app')
