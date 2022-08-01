<template>
  <div id="admin-login-container">
    <img
      class="logo-img"
      src="../assets/logo@2.png"
      alt=""
    >
    <h1>後台登入</h1>
    <form
      class="form-container"
      @submit.prevent.stop="handleSubmit"
    >
      <div class="form-element-group">
        <label for="admin-account">帳號</label>
        <input
          id="admin-account"
          v-model="account"
          type="text"
          class="admin-account"
          placeholder="請輸入帳號"
          required
        >
      </div>
      <div class="form-element-group">
        <label for="admin-password">密碼</label>
        <input
          id="admin-password"
          v-model="password"
          type="password"
          class="admin-password"
          placeholder="請輸入密碼"
          required
        >
      </div>
      <button
        class="login-btn main-btn-style"
        type="submit"
        :disabled="isProcessing"
      >
        登入
      </button>
      <router-link
        to="/login"
        class="submit-other-choice text-right"        
      >
        前台登入
      </router-link>
    </form>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'

export default {
  name: 'AdminLogIn',
  data () {
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit (e) {
      try{
        console.log('e=',e)
        if (!this.account || !this.password){
          Toast.fire({
            icon: 'warning',
            title: '請填入 account 和 password'
          })
          return
        }

        this.isProcessing = true

        const response = await authorizationAPI.adminSignIn({
          account: this.account,
          password: this.password
        })

        const {data} = response
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        //暫停在這

      }catch (error) {
        this.password = ''
        this.isProcessing = false

        Toast.fire({
          icon: 'warning',
          title: '輸入的帳號密碼有誤'
        })
        
        console.error(error.message)
      }
    }
  }
}
</script>  

