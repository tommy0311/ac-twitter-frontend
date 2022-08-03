import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 相當於 Vue 的 data
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email: '',
      avatar: '',
      cover: '',
      role: '',
      introduction: '',
      tweetsCount: 0,
    },
    isAuthenticated: false,
    token: ''
  },
  getters: {
  },
  // commit 發動 mutations
  mutations: { // 用來修改 state 的方法，相當於 Vue 的 methods
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser // 透過 API 取得的 currentUser 覆蓋原本 Vuex state 中的 currentUser
      }

      state.isAuthenticated = true // 將使用者的登入狀態改為 true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  // dispatch 發動 actions 透過 API 請求資料
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來
        const { data } = await usersAPI.getCurrentUser()
        const { id, account, name, email, avatar, cover, role, introduction } = data

        const tweets = await usersAPI.getUserTweets({ userId: id })

        commit('setCurrentUser', {
          id,
          account,
          name,
          email,
          avatar,
          cover,
          role,
          introduction,
          tweetsCount: tweets.data.length
        })

        return true
      } catch (error) {
        console.error('can not fetch user information')
        console.error(error.message)
        commit('revokeAuthentication') // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        return false
      }
    }
  },
  modules: { // 如果 state 資料量太龐大，可以拆分出很多 modules 方便管理
    
  }
})
