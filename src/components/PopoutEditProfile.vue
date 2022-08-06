<template>
  <div class="wrapper">
    <div
      class="popup-background"
      @click="closeModal"
    />
    <div id="popup-profile-editing-container">
      <div class="headerbox d-flex">
        <button>
          <img
            class="popup-cancel-icon"
            src="../assets/X.png"
            alt="取消推文視窗按鈕"
            @click="closeModal"
          >
        </button>

        <p>編輯個人資料</p>
      </div>
      <form
        enctype="multipart/form-data"
        @submit.stop.prevent="handleSubmit"
      >
        <div class="userProfile-editing-container flex-column">
          <div class="img-cover-for-profile-background-img">
            <img
              v-if="cover"
              class="profile-background-img"
              :src="cover | emptyImage"
              alt="user cover"
            >
            <img
              v-else
              class="profile-background-img"
              :src="user.cover | emptyCover"
              alt="user cover"
            >
            <div class="icon-editing-background-img-pannel">
              <span>
                <input
                  id="cover"
                  type="file"
                  name="cover"
                  accept="image/*"
                  hidden
                  :disabled="isCoverProcessing"
                  @change="handleFileChange"
                >
                <label for="cover">
                  <img
                    src="../assets/icon_uploadPhoto.png"
                    alt="上傳照片按鈕"
                    class="icon-for-background-add"
                  >
                </label>
              </span>
              <span
                @click="deleteTempCover"
              >
                <img
                  src="../assets/icon_delete.png"
                  alt="刪除上傳照片按鈕"
                  class="icon-for-background-delete"
                >
              </span>
            </div>
          </div>
          <div class="img-cover-for-profile-headshot-img" />
          <img
            v-if="avatar"
            class="profile-headshot"
            :src="avatar | emptyImage"
            alt="個人頭像"
          >
          <img
            v-else
            class="profile-headshot"
            :src="user.avatar | emptyImage"
            alt="個人頭像"
          >
          <span>
            <input
              id="avatar"
              type="file"
              name="avatar"
              accept="image/*"
              hidden
              :disabled="isAvatarProcessing"
              @change="handleFileChange"
            >
            <label for="avatar">
              <img
                src="../assets/icon_uploadPhoto.png"
                alt="上傳照片按鈕"
                class="icon-for-headshot-add"
              >
            </label>
          </span>
          <div class="editing-form-pannel">
            <div class="form-container">
              <div class="form-element-group">
                <label for="user-account">名稱</label>
                <input
                  v-if="nameLength > 50"
                  id="user-account"
                  v-model="name"
                  type="text"
                  name="name"
                  class="user-account formInputStyle error"
                  required
                >
                <input
                  v-else
                  id="user-account"
                  v-model="name"
                  type="text"
                  name="name"
                  class="user-account"
                  required
                >
                <div class="d-flex justify-content-end">
                  <span
                    v-show="nameLength > 50"
                    style="position: absolute; left: 0px; bottom: 0px; font-size:12px; color: red;"
                  >
                    字數超出上限！
                  </span>
                  <span class="editing-world-limit mt-1">{{ nameLength }}/50</span>
                </div>
              </div>
              <div class="form-element-group">
                <label for="user-introduction">自我介紹</label>
                <textarea
                  id="user-introduction"
                  v-model="introduction"
                  name="introduction"
                  type="text"
                  class="user-introduction"
                  required
                />
                <div class="d-flex justify-content-end">
                  <span
                    v-show="introLength > 160"
                    style="position: absolute; left: 0px; bottom: 0px; font-size:12px; color: red;"
                  >
                    字數超出上限！
                  </span>
                  <span class="editing-world-limit mt-1"> {{ introLength }}/160</span>
                </div>
              </div>
            </div>
          </div>
          <button
            class="save-btn second-btn-style"
            type="submit"
          >
            儲存
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import userAPI from '../apis/users'
import { emptyImageFilter } from './../utils/mixins'
import { Toast } from './../utils/helpers'
import store from './../store'

export default {
  mixins: [emptyImageFilter],
  props: {
    user: {
      type: Object,
    },
    closeModal: {
      type: Function,
    },
  },
  data() {
    return {
      name: store.state.currentUser.name,
      introduction: store.state.currentUser.introduction,
      nameLength: 0,
      introLength: 0,
      isAvatarProcessing: false,
      isCoverProcessing: false,
      cover: store.state.currentUser.cover,
      avatar: store.state.currentUser.avatar,
    }
  },
  watch: {
    name: 'showNameLength',
    introduction: 'showIntroLength',
  },
  created() {
    this.showNameLength()
    this.showIntroLength()
  },
  methods: {
    deleteTempCover() {
      this.cover = store.state.currentUser.cover
    },
    showNameLength() {
      this.nameLength = this.name.length
    },
    showIntroLength() {
      this.introLength = this.introduction.length
    },
    handleFileChange(e) {
      if (e.target.name === 'cover') {
        this.isCoverProcessing = true
        Toast.fire({
          icon: 'info',
          title: 'Cover 上傳中，上傳按鈕 disabled',
        })
      } else if (e.target.name === 'avatar') {
        this.isAvatarProcessing = true
        Toast.fire({
          icon: 'info',
          title: 'Avatar 上傳中，上傳按鈕 disabled',
        })
      }
      const { files } = e.target
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        e.target.name === 'cover' ? (this.cover = '') : (this.avatar = '')
      } else {
        // 否則產生預覽圖
        // const imageURL = window.URL.createObjectURL(files[0])
        if (e.target.name === 'cover') {
          this.cover = window.URL.createObjectURL(files[0])
          this.isCoverProcessing = false
        } else {
          this.avatar = window.URL.createObjectURL(files[0])
          this.isAvatarProcessing = false
        }
      }
    },
    async handleSubmit(e) {
      try {
        const form = e.target
        if (!this.name.trim().length || !this.introduction.trim().length) {
          Toast.fire({
            icon: 'error',
            title: '不可留空',
          })
          return
        }
        if (this.name.length > 50) {
          Toast.fire({
            icon: 'error',
            title: '使用者名稱不可超過50字',
          })
          return
        }
        if (this.introduction.length > 160) {
          Toast.fire({
            icon: 'error',
            title: '使用者簡介不可超過160字',
          })
          return
        }
        const user = {
          id: this.user.id,
          account: this.user.account,
          email: this.user.email,
        }
        const formData = new FormData(form)
        for (const [name, value] of formData.entries()) {
          console.log(name + ': ' + value)
        }
        formData.append('account', user.account)
        formData.append('email', user.email)

        const { data } = await userAPI.putUser(formData, user)
        if ( data.status === 'error' ) {
          throw new Error(data.message)
        }

        this.$store.commit('setCurrentUser', data)

        Toast.fire({
          icon: 'success',
          title: '成功更新！',
        })
        this.closeModal()
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '發生錯誤，請重試。',
        })
        console.error(err.message)
      }
    },
  },
}
</script>
