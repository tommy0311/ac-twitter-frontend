<template>
  <div
    id="setting-form-container"
    class="flex-column"
  >
    <form
      class="form-container"
      @submit.prevent.stop="handleSubmit"
    >
      <div class="form-element-group">
        <label for="user-account">帳號</label>
        <input
          id="user-account"
          v-model="user.account"
          type="text"
          class="user-account"
          placeholder="請輸入帳號"
          required
        >
      </div>
      <div class="form-element-group">
        <label for="user-name">名稱</label>
        <input
          id="user-name"
          v-model="user.name"
          type="text"
          class="user-account"
          placeholder="請輸入使用者名稱"
          required
        >
      </div>
      <div class="form-element-group">
        <label for="user-name">Email</label>
        <input
          id="user-email"
          v-model="user.email"
          type="email"
          class="user-email"
          placeholder="請輸入Email"
          required
        >
      </div>
      <div class="form-element-group">
        <label for="user-password">密碼</label>
        <input
          id="user-password"
          v-model="user.password"
          type="password"
          class="user-password"
          placeholder="請輸入密碼"
          required
        >
      </div>
      <div class="form-element-group">
        <label for="user-password-confirm">密碼再確認</label>
        <input
          id="user-password-confirm"
          v-model="user.checkPassword"
          type="password"
          class="user-password-confirm"
          placeholder="請再次輸入密碼"
          required
        >
      </div>
      <div class="d-flex justify-content-end">
        <button
          class="login-btn main-btn-style"
          type="submit"
          :disabled="isProcessing"
        >
          儲存
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import userAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import store from './../store'

export default {
  name: "SettingForm",
  data() {
    return {
      user: { ...store.state.currentUser },
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (
          !this.user.account ||
          !this.user.name ||
          !this.user.email ||
          !this.user.password ||
          !this.user.checkPassword
        ) {
          Toast.fire({
            icon: 'warning',
            title: '請確認已填寫所有欄位'
          })
          return
        }

        if (this.user.password !== this.user.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '兩次輸入的密碼不同'
          })
          this.user.checkPassword = ''
          return
        }
        this.isProcessing = true

        const { data } = await userAPI.putUser(this.user)
        if ( data.status ) {
          throw new Error(data.message)
        }
        console.log('putUser data=', data)
        if(data.user.email === this.user.email) {
          throw new Error('email 已重複註冊！')
        } else if(data.user.account === this.user.account) {
          throw new Error('account 已重複註冊！')
        }
        this.$store.commit('setCurrentUser', data)

        Toast.fire({
          icon: 'success',
          title: `使用者-${this.user.account}-設定儲存成功`
        })
        
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'warning',
          title: `設定儲存失敗 - ${error.message}`
        })
      }
    }
  }
}
</script>
