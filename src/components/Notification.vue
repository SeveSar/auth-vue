<template>
  <transition name="fade">
    <div
      class="notice"
      v-if="alert"
      :class="{ 'notice--error': alert.type === 'error' }"
    >
      <font-awesome-icon style="margin-right: 10px;" :icon="changeIcon" />
      <span>{{ alert.msg }}</span>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['clearNotice']),
    closeAlertMsg () {
      setTimeout(() => {
        this.$emit('close-alert-msg')
      }, 5000)
    }
  },
  computed: {
    changeIcon () {
      return this.alert.type === 'error'
        ? 'times-circle'
        : 'check-circle'
    },
    ...mapGetters(['alert'])
  }

}
</script>
<style lang="scss">
.notice {
  max-width: 500px;
  width: 100%;
  background-color: rgb(232, 240, 254);
  padding: 10px 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  color: rgb(22, 177, 29);
  border: 2px solid rgb(7, 136, 16);
  &--error {
    color: rgb(126, 17, 17);
    border: 2px solid rgb(126, 17, 17);
  }

}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
