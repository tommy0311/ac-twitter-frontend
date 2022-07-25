<template>
   <div id="regist-container">
      <img class="logo-img" src="../assets/logo@2.png" alt="" />
      <h1>建立你的帳號</h1>
      <form 
        class="form-container" 
        @submit.prevent.stop="handleSubmit"
      >
        <div class="form-element-group">
          <label for="user-account">帳號</label>
          <input
            type="text"
            id="user-account"
            v-model="userAccount"
            class="user-account"
            placeholder="請輸入帳號"
            required
          />
        </div>
        <div class="form-element-group">
          <label for="user-name">名稱</label>
          <input
            type="password"
            id="user-name"
            v-model="userName"
            class="user-name"
            placeholder="請輸入使用者名稱"
            required
          />
        </div>
        <div class="form-element-group">
          <label for="user-name">Email</label>
          <input
            type="email"
            id="user-email"
            v-model="userEmail"
            class="user-email"
            placeholder="請輸入Email"
            required
          />
        </div>
        <div class="form-element-group">
          <label for="user-password">密碼</label>
          <input
            type="password"
            id="user-password"
            v-model="userPassword"
            class="user-password"
            placeholder="請輸入密碼"
            required
          />
        </div>
        <div class="form-element-group">
          <label for="user-password-confirm">密碼確認</label>
          <input
            type="password"
            id="user-password-confirm"
            v-model="userpasswordCheck"
            class="user-password-confirm"
            placeholder="請再次輸入密碼"
            required
          />
        </div>
        <button 
          class="login-btn main-btn-style" 
          type="submit">
          註冊
        </button>
        <a class="submit-other-choice text-center" href="">取消</a>
      </form>
    </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'
export default {
  data () {
    return {
      userAccount: '',
      userName: '',
      userEmail: '',
      userPassword: '',
      userpasswordCheck: ''
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (
          !this.userAccount ||
          !this.userName ||
          !this.userEmail ||
          !this.userPassword ||
          !this.userpasswordCheck
        ) {
          Toast.fire({
            icon: 'warning',
            title: '請確認已填寫所有欄位'
          })
          return
        }

        if (this.userPassword !== this.userpasswordCheck) {
          Toast.fire({
            icon: 'warning',
            title: '兩次輸入的密碼不同'
          })
          this.userpasswordCheck = ''
          return
        }

        const { data } = await authorizationAPI.signUp({
          account: this.userAccount,
          name: this.userName,
          email: this.userEmail,
          password: this.userPassword,
          passwordCheck: this.userpasswordCheck
        })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: data.message
        })
        // 成功登入後轉址到登入頁
        this.$router.push('/signin')
      }catch (error) {
        Toast.fire({
          icon: 'warning',
          title: `無法註冊 - ${error.message}`
        })
      }
    }
  }
}
</script>