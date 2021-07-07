<template>
  <Navbar></Navbar>
  <div class="intro">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  background-color: #535fe6;
  position: relative;
}

body {
  margin: 0;
}
.container {
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}
.intro {
  height: 100%;

}
</style>
