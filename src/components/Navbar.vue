<template>
  <header class="header" v-if="isUser">
    <div class="container">
      <div class="header__inner">
        <div href="#" class="header__username">Logo</div>
        <nav class="nav">
          <router-link class="nav__link" :to="{ name: 'weather' }"
            >Weather online</router-link
          >
          <router-link class="nav__link" :to="{ name: 'home' }"
            >Home</router-link
          >
          <a href="#" @click="signOut" class="nav__link">Sign Out</a>
        </nav>
      </div>
    </div>
  </header>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['setUser']),
    signOut () {
      firebase.auth().signOut()
      this.setUser(null)
      this.$router.push({ name: 'sign-in' })
    }
  },
  computed: {
    ...mapGetters(['isUser', 'user'])
  }
}
</script>
<style lang="scss">
.header {
  color: #1a2430;
  background-color: #fff;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__link {
    margin-right: 15px;
    text-decoration: none;
    color: #1a2430;
    transition: all 0.2 linear;
    padding: 20px;
    &:last-child {
      margin-right: 0;
    }
    &.active {
      background-color: #1a2430;
      color: #fff;
      transition: all 0.2s linear;
    }
  }
}
</style>
