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
        <button
          class="edit-profile-btn empty-btn-style ml-4"
          type="submit"
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
            name: 'user-id-followinglist',
            params: { userId: user.id }
          }"
        >
          <span class="following-number">
            {{ user.followingCount }} 個
          </span>
          <span class="ml-1">跟隨中</span>
        </router-link>
        
        <router-link
          :to="{
            name: 'user-id-followerlist',
            params: { userId: user.id }
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