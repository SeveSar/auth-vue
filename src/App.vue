<template>
  <Navbar></Navbar>
  <div class="intro">
    <div class="container">
      <div class="intro__inner">
        <router-view></router-view>
      </div>
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
    return {

    }
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
  height: 100%;
  background-color: #535fe6;
  position: relative;
}
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
.container {
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}
.intro {
  height: 100%;
  .container {
    height: 100%;
  }
  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
