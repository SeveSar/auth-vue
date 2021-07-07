<template>
  <div class="auth">
    <Notification />
    <div class="card">
      <form class="form" action="/">
        <h4 class="form__title">Registration</h4>
        <div class="form__group">
          <label for="username">Username</label>
          <input
            class="form__control"
            ref="username"
            v-model="formData.username"
            type="text"
            id="username"
            @focus="clearNotice"
            :class="{ error: v$.formData.username.$error }"
          />
          <small class="form__notice" v-if="v$.formData.username.$error">{{
            v$.formData.username.required.$invalid
              ? "Username is required"
              : "Min symbols is 3"
          }}</small>
        </div>
        <div class="form__group">
          <label for="email">Email</label>
          <input
            class="form__control"
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
            v-model="formData.passwords.password"
            id="password"
            :class="{ error: v$.formData.passwords.password.$error }"
            @focus="clearNotice"
          />
          <small
            class="form__notice"
            v-if="v$.formData.passwords.password.$error"
            >{{
              v$.formData.passwords.password.required.$invalid
                ? "Password is required"
                : "Min symbols is 7"
            }}</small
          >
        </div>
        <div class="form__group">
          <label for="password">Confirm the password</label>
          <input
            class="form__control"
            type="password"
            v-model="formData.passwords.confirm"
            id="confirm-password"
            :class="{ error: v$.formData.passwords.confirm.$error }"
            @focus="clearNotice"
          />
          <small
            class="form__notice"
            v-if="v$.formData.passwords.confirm.$error"
            >Passwords aren't similar</small
          >
        </div>
        <div class="form__actions">
          <button class="btn" type="submit" @click.prevent="submit">
            {{ changeText }}
          </button>
          <div class="form__to">
            <span>Do you have an account?</span>
            <router-link class="link" :to="{ name: 'sign-in' }"
              >Sign In</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'
import Notification from '@/components/Notification'
export default {
  components: {
    Notification
  },
  data () {
    return {
      formData: {
        username: '',
        email: '',
        passwords: {
          password: '',
          confirm: ''
        }
      },
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      formData: {
        username: { required, minLength: minLength(3) },
        email: { required, email },
        passwords: {
          password: { required, minLength: minLength(7) },
          confirm: { sameAs: sameAs(this.formData.passwords.password) }
        }
      }
    }
  },
  methods: {
    ...mapActions(['createUser', 'clearNotice']),
    submit () {
      this.v$.$touch()
      if (!this.v$.$invalid) {
        this.createUser({
          email: this.formData.email,
          password: this.formData.passwords.password
        }).then(() => {
          this.$router.push({ name: 'home' })
        })
      }
    }
  },
  computed: {
    ...mapGetters(['loading']),
    changeText () {
      return this.loading ? 'Loading...' : 'Sign Up'
    }
  }
}
</script>
<style lang="scss">
.auth {
  height: 100vh;
  display: flex;
}
.card {
  max-width: 500px;
  width: 100%;
  margin: auto;
  padding: 30px;
  background-color: #1c1e21;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  &__alert {
    background-color: rgba(175, 28, 28, 0.9);
    padding: 9px 15px;
    margin-bottom: 15px;
    border-radius: 7px;
  }
}

.btn {
  border: none;
  width: 100%;
  padding: 7px 15px;
  border-radius: 7px;
  background: #025ce2;
  transition: 0.2s linear all;
  color: #fff;
  &:hover {
    background: #0b3d88;
  }
}
.link {
  display: block;
  text-decoration: none;
  color: #025ce2;
  transition: all 0.2s linear;
  margin-left: 7px;
}
.form {
  &__title {
    text-align: center;
    margin-bottom: 25px;
  }
  &__group {
    margin-bottom: 15px;
    label {
      display: block;
      margin-bottom: 7px;
    }
  }
  &__notice {
    color: rgb(175, 28, 28);
    display: block;
    margin-top: 6px;
    font-size: 14px;
  }
  &__to {
    display: flex;
    align-items: center;
    margin-top: 12px;
  }
  &__actions {
    padding-top: 25px;
  }
  &__control {
    width: 100%;
    border: 2px solid transparent;
    padding: 10px 15px;
    border-radius: 7px;
    transition: all 0.2s linear;
    &:focus {
      outline: none;
      border-color: #025ce2;
      box-shadow: 0 0 20px rgba(#025ce2, 0.9);
    }
  }
}
.error {
  border-color: rgb(175, 28, 28);
  box-shadow: 0 0 20px rgba(175, 28, 28, 0.9);
}
</style>
