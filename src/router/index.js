import { createRouter, createWebHashHistory } from 'vue-router'
import SignUp from '@/views/SignUp'
import SignIn from '@/views/SignIn'
import Home from '@/views/Home'
import Weather from '@/views/Weather'
import Error404 from '@/views/Error404'
import firebase from 'firebase/app'
import 'firebase/auth'
import store from '../store'
const routes = [
  {
    path: '/signup',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/signin',
    alias: '/',
    name: 'sign-in',
    component: SignIn,
    beforeEnter: (to, from, next) => {
      console.log('router1:', store.getters.user)
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next({ name: 'home' })
        } else {
          next()
        }
      })
      // store.getters.isUser ? next('/home') : next()
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      console.log('router2:', store.getters.user)
      store.getters.isUser ? next() : next({ name: 'sign-in' })
    }
  },
  {
    path: '/weather',
    name: 'weather',
    component: Weather,
    beforeEnter: (to, from, next) => {
      console.log('router1:', store.getters.user)
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          next({ name: 'sign-in' })
        } else {
          next()
        }
      })
      // store.getters.isUser ? next('/home') : next()
    }
  },
  {
    path: '/:pathMatch(.*)*', component: Error404
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

// router.beforeEach((to, from, next) => {
// })

export default router
