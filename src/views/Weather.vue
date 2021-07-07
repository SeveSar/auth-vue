<template>
  <div class="weather">
    <h1 class="weather__title">Check weather online</h1>
    <form action="/" class="form" @submit.prevent="submitForm">
      <div class="form__group">
        <input
          v-model="inputCity"
          class="form__control"
          type="text"
          placeholder="Type city name"
          @focus="clearNotice"
        />
        <small
          class="form__notice"
          v-if="v$.inputCity.$error"
          >is required</small
        >
        <button type="submit" class="form__search"><font-awesome-icon icon="search" /></button>
      </div>
      <button class="btn" type="submit">Show</button>
    </form>
    <div class="weather__block" v-if="weather">
      <div class="weather__block-header">
        <h4 class="weather__block-title">5 day forecast</h4>
        <h4 class="weather__block-title">{{ weather.city }}</h4>
      </div>
      <div class="weather__block-body">
        <div
          class="weather__block-col"
          v-for="item in weather.data"
          :key="item.date"
        >
          <div class="weather__block-item block__item">
            <time datetime="2020-05-05" class="block__item-date">{{
              item.date
            }}</time>
            <img class="block__item-icon" :src="item.icon" alt="icon" />
            <div class="block__item-footer">
              <div class="block__item-weather">{{ item.weather }}</div>
              <span class="block__item-temp">{{ item.temp }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Notification v-else />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Notification from '@/components/Notification'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
  components: {
    Notification
  },
  data () {
    return {
      inputCity: '',
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      inputCity: { required }
    }
  },
  methods: {
    ...mapActions(['fetchWeatherDays', 'clearNotice', 'clearWeather']),
    async submitForm () {
      this.v$.$touch()
      if (!this.v$.$invalid) {
        this.fetchWeatherDays(this.inputCity)
      }
    }
  },
  computed: {
    ...mapGetters(['weather'])
  },
  watch: {
    inputCity (value) {
      if (value.length === 0) {
        this.clearWeather()
      }
    }
  }
}
</script>
<style lang="scss">
.weather {
  min-height: 100vh;
  padding-top: 94px;
  &__title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 25px;
  }
  .form {
    display: flex;
    align-items: flex-start;
    &__group {
      width: 80%;
      margin-bottom: 0;
      position: relative;
      @media screen and(max-width: 575px) {
        width: 100%;
      }
    }
    &__control {
      width: 100%;
      padding: 7px 15px;
    }
    .btn {
      width: 200px;
      padding: 9px 15px;
      margin-left: 10px;
      background: #23c3e7;
      box-shadow: 0 0 10px rgba(#000, 0.4);
      &:hover {
        background: darken(#23c3e7, 15%);
      }
      @media screen and(max-width: 575px) {
        display: none;
      }
    }
    &__search {
      display: none;
      border: none;
      padding: 0;
      background: transparent;
      position: absolute;
      right: 10px;
      top: 11px;
      z-index: 4;
      svg {
        font-size: 20px;
      }
      @media screen and(max-width: 575px) {
        display: block;
      }
    }
  }
  &__block {
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 30px;
      background-color: rgb(27, 71, 99);
      margin: 10px 0;
      text-transform: uppercase;
      h4 {
        margin: 0;
      }
    }
    &-body {
      display: flex;
      margin: 0 -7px;
      flex-wrap: wrap;
      @media screen and (max-width: 766px) {
        margin: 0;
      }
    }
    &-col {
      width: 20%;
      padding: 0 7px;
      @media screen and (max-width: 1050px) {
        width: 50%;
        padding-bottom: 15px;
      }
      @media screen and (max-width: 767px) {
        width: 100%;
        padding: 0 0 15px 0;
      }
    }
    .block__item {
      display: flex;
      flex-direction: column;
      text-align: center;
      height: 400px;
      font-size: 35px;
      background-color: rgb(70, 144, 188);
      @media screen and (max-width: 1050px) {
        max-width: 350px;
        width: 100%;
        margin: 0 auto;
      }
      &-date {
        display: block;
        padding: 15px 10px;
        background-color: rgb(27, 71, 99);
        margin-bottom: 25px;
      }
      &-icon {
        display: block;
        margin: auto;
        max-width: 100%;
        height: 120px;
      }
      &-temp {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          right: -11px;
          top: 1px;
          display: block;
          height: 10px;
          width: 10px;
          border-radius: 100%;
          background-color: #fff;
          z-index: 5;
        }
      }
      &-weather {
        font-size: 16px;
        white-space: nowrap;
        margin-bottom: 10px;
      }
      &-footer {
        margin-top: auto;
        background-color: rgb(27, 71, 99);
        text-transform: uppercase;
        padding: 10px;
      }
    }
  }
  .notice {
    margin-top: 20px;
    margin: 20px auto 20px auto;
  }
}
</style>
