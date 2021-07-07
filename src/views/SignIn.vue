<template>
  <div class="auth">
    <Notification></Notification>
    <div class="card">
      <form class="form" action="/">
        <h4 class="form__title">Authorization</h4>
        <div class="form__group">
          <label for="email">Email</label>
          <input
            class="form__control"
            ref="email"
            v-model="formData.email"
            type="email"
            id="email"
            @focus="clearNotice"
            :class="{ error: v$.formData.email.$error }"
          />
          <small class="form__notice" v-if="v$.formData.email.$error">
            {{
              v$.formData.email.required.$invalid
                ? "E-mail is required"
                : "Type correct e-mail"
            }}
          </small>
        </div>
        <div class="form__group">
          <label for="password">Password</label>
          <input
            class="form__control"
            type="password"
            @focus="clearNotice"
            ref="password"
            v-model="formData.password"
            id="password"
            :class="{ error: v$.formData.password.$error }"
          />
          <small class="form__notice" v-if="v$.formData.password.$error">{{
            v$.formData.password.required.$invalid
              ? "Password is required"
              : "Min symbols is 7"
          }}</small>
        </div>
        <div class="form__actions">
          <button class="btn" type="submit" @click.prevent="submit">
            {{ changeText }}
          </button>
          <div class="form__to">
            <span>Don't you have an account?</span>
            <router-link class="link" :to="{ name: 'sign-up' }"
              >Sign Up</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import Notification from '@/components/Notification'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Notification
  },
  data () {
    return {
      formData: {
        email: '',
        password: ''
      },
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      formData: {
        email: { required, email },
        password: { required, minLength: minLength(7) }
      }
    }
  },
  methods: {
    ...mapActions(['logUser', 'clearNotice']),
    submit () {
      this.v$.$touch()
      if (!this.v$.$invalid) {
        this.logUser({
          email: this.formData.email,
          password: this.formData.password
        }).then(() => {
          this.$router.push({ name: 'home' })
        })
      }
    }
  },
  computed: {
    ...mapGetters(['isUser', 'loading']),
    changeText () {
      return this.loading ? 'Loading...' : 'Sign In'
    }
  }
}
</script>
<style lang="scss">
[v-cloak] {
  display: none;
}
</style>
