<template>
  <div id="login-container">
    <img
      class="logo-img"
      src="../assets/logo@2.png"
      alt=""
    >
    <h1>登入Alphitter</h1>
    <form 
      class="form-container" 
      @submit.prevent.stop="handleSubmit"
    >
      <div class="form-element-group">
        <label for="user-account">帳號</label>
        <input
          id="user-account"
          v-model="account"
          type="text"
          class="user-account"
          placeholder="請輸入帳號"
        >
      </div>
      <div class="form-element-group">
        <label for="user-password">密碼</label>
        <input
          id="user-password"
          v-model="password"
          type="password"
          class="user-password"
          placeholder="請輸入密碼"
        >
      </div>
      <button 
        class="login-btn main-btn-style" 
        type="submit"
        :disabled="isProcessing"
      >
        登入
      </button>
      <div class="d-flex admin-text-link-container text-right">
        <router-link
          to="/regist"
          class="submit-other-choice"
        >
          註冊
        </router-link>
        <span> · </span>
        <router-link
          to="/admin"
          class="submit-other-choice"          
        >
          後台登入
        </router-link>
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

        data.user.tweetsCount = 0
        // 透過 setCurrentUser 把從 API 獲得的 data.user 存到 Vuex 的 state 中
        this.$store.commit('setCurrentUser', data.user)

        Toast.fire({
          icon: 'success',
          title: `使用者-${this.account}-登入成功`
        })
        this.$router.push('/main') // 成功登入後進行轉址
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