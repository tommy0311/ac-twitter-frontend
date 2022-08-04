<template>
  <div id="regist-container">
    <img
      class="logo-img"
      src="../assets/logo@2.png"
      alt=""
    >
    <h1>建立你的帳號</h1>
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
        <label for="user-name">名稱</label>
        <input
          id="user-name"
          v-model="name"
          type="text"
          class="user-account"
          placeholder="請輸入使用者名稱"
        >
      </div>
      <div class="form-element-group">
        <label for="user-name">Email</label>
        <input
          id="user-email"
          v-model="email"
          type="email"
          class="user-email"
          placeholder="請輸入Email"
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
      <div class="form-element-group">
        <label for="user-password-confirm">密碼確認</label>
        <input
          id="user-password-confirm"
          v-model="checkPassword"
          type="password"
          class="user-password-confirm"
          placeholder="請再次輸入密碼"
        >
      </div>
      <button 
        class="login-btn main-btn-style" 
        type="submit"
        :disabled="isProcessing"
      >
        註冊
      </button>
      <a
        class="submit-other-choice text-center"
        href="javascript:history.back()"
      >
        取消
      </a>
    </form>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'
export default {
  name: "RegistForm",
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (
          !this.account ||
          !this.name ||
          !this.email ||
          !this.password ||
          !this.checkPassword
        ) {
          Toast.fire({
            icon: 'warning',
            title: '請確認已填寫所有欄位'
          })
          return
        }
        
        if (this.password !== this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '兩次輸入的密碼不同'
          })
          this.checkPassword = ''
          return
        }
        this.isProcessing = true

        const { data } = await authorizationAPI.signUp({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword
        })
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: `使用者-${this.account}-註冊成功`
        })
        
        this.$router.push('/login') // 成功註冊後轉址到登入頁
      }catch (error) {
        this.isProcessing = false

        if (error.message === 'Error: Account already exists!') {
          error.message = "account 已重複註冊！"
        } else if (error.message === 'Error: Email already exists!') {
          error.message = "mail 已重複註冊！"
        }

        Toast.fire({
          icon: 'warning',
          title: `無法註冊 - ${error.message}`
        })
      }
    }
  }
}
</script>