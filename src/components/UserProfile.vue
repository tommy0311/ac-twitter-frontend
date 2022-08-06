<template>
  <div
    id="userProfile-container"
    class="flex-column"
  >
    <img
      class="profile-background-img"
      :src="user.cover | emptyCover"
      alt=""
    >
    <img
      class="profile-headshot"
      :src="user.avatar | emptyImage"
      alt="個人頭像"
    >
    <div class="profile-info-container">
      <div class="d-flex justify-content-end">
        <!-- <router-link
          class="edit-profile-btn empty-btn-style ml-4"
          :to="{
            name: 'user-self-edit' // 導引至 編輯個人資料頁
          }"
        >
          編輯個人資料
        </router-link> -->
        <button
          class="edit-profile-btn empty-btn-style ml-4"
          @click="showModal"
        >
          編輯個人資料
        </button>
      </div>
      <h4 class="user-name mt-4">
        {{ user.name }}
      </h4>
      <p class="user-acount">
        <span>@</span>
        {{ user.account }}
      </p>
      <p class="user-describe mt-2">
        {{ user.introduction }}
      </p>
      <div class="user-follow-info d-flex mt-2">
        <router-link
          :to="{
            name: 'user-followinglist',
          }"
        >
          <span class="following-number">
            {{ user.followingCount }} 個
          </span>
          <span class="ml-1">跟隨中</span>
        </router-link>
        
        <router-link
          :to="{
            name: 'user-followerlist',
          }"
        >
          <span class="follower-number ml-5">
            {{ user.followerCount }} 位
          </span>
          <span class="ml-1">跟隨者</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
export default {
  name: "UserProfile",
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      default: () => {
        return {
          id: -1,
          account: '',
          email: '',
          name: '',
          avatar: '',
          cover: '',
          introduction: '',
          role: 'user',
          followingCount: -1,
          followerCount: -1
        }
      }
    },
    showModal: {
      type: Function,
    }
  },
  data () {
    return {
      user: {
        ...this.initialUser
      },
      isLoading: true
    }
  },
  watch: {
    initialUser (newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
    }
  }
}
</script>