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
        <label 
          for="user-account"
          class="label-name-style"
        >
          <span class="span-neme-style">
            帳號
          </span>
          <span>
            {{ user.account.length }} / 10
          </span>
        </label>
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
        <label
          for="user-name"
          class="label-name-style"
        >
          <span class="span-neme-style">
            名稱
          </span>
          <span>
            {{ user.name.length }} / 50
          </span>
        </label>
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
        this.user.account = this.user.account.trim()
        this.user.name = this.user.name.trim()
        this.user.email = this.user.email.trim()
        
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

        if (this.user.account.length > 10) {
          Toast.fire({
            icon: 'warning',
            title: '帳號字數不可超過10字'
          })
          return
        }

        if (this.user.name.length > 50) {
          Toast.fire({
            icon: 'warning',
            title: '名稱字數不可超過50字'
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

        const { data } = await userAPI.putUserForSettingFrom(this.user)
        if ( data.status === 'error' ) {
          throw new Error(data.message)
        }
        this.$store.commit('setCurrentUser', data)

        Toast.fire({
          icon: 'success',
          title: `使用者-${this.user.account}-設定儲存成功`
        })

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false

        if (error.message === 'Error: Account already exists!') {
          error.message = "account 已重複註冊！"
        } else if (error.message === 'Error: Email already exists!') {
          error.message = "email 已重複註冊！"
        }

        Toast.fire({
          icon: 'warning',
          title: `設定儲存失敗 - ${error.message}`
        })
      }
    }
  }
}
</script>
