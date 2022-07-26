<template>
  <div id="login-container">
    <img class="logo-img" src="../assets/logo@2.png" alt="" />
    <h1>登入Alphitter</h1>
    <form 
      class="form-container" 
      @submit.prevent.stop="handleSubmit"
    >
      <div class="form-element-group">
        <label for="user-account">帳號</label>
        <input
          v-model="account"
          type="text"
          id="user-account"
          class="user-account"
          placeholder="請輸入帳號"
        />
      </div>
      <div class="form-element-group">
        <label for="user-password">密碼</label>
        <input
          v-model="password"
          type="password"
          id="user-password"
          class="user-password"
          placeholder="請輸入密碼"
        />
      </div>
      <button 
        class="login-btn main-btn-style" 
        type="submit"
        :disabled="isProcessing"
      >
        登入
      </button>
      <div class="d-flex admin-text-link-container text-right">
        <router-link to="/regist" class="submit-other-choice">
          註冊
        </router-link>
        <span> · </span>
        <a class="submit-other-choice" href="">後台登入</a>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'

export default {
  name: 'LoginForm',
  data () {
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit (e) {
      try {
        console.log('e=',e)
        if (!this.account || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填入 account 和 password'
          })
          return
        }

        this.isProcessing = true

        const response = await authorizationAPI.signIn({
          account: this.account,
          password: this.password
        })

        const { data } = response
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        // 將伺服器回傳的 token 保存在 localStorage 中
        localStorage.setItem('token', data.token)

        // 透過 setCurrentUser 把使用者資料存到 Vuex 的 state 中
        // this.$store.commit('setCurrentUser', data.user)

        // 成功登入後進行轉址
        this.$router.push('/main')
      } catch (error) {
        this.password = '' // 密碼欄位清空
        this.isProcessing = false

        // 顯示錯誤提示
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