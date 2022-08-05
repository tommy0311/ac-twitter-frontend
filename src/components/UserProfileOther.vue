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
          class="profile-btn mr-4"
          type="submit"
        >
          <img
            src="../assets/message.png"
            alt="寄送訊息"
            class="profile-btn-size"
          >
        </button>
        <button
          class="profile-btn"
          type="submit"
        >
          <img
            src="../assets/noti.png"
            alt="訂閱按鈕"
            class="profile-btn-size"
          >
        </button>
        <button
          class="profile-btn-solid"
          type="submit"
        >
          <img
            src="../assets/noti-white.png"
            alt="退訂閱按鈕"
            class="profile-btn-size"
          >
        </button>
        <button
          v-if="user.isFollowed"
          class="follow-btn empty-btn-style-active ml-4"
          @click.stop.prevent="removeFollowing(user.id)"
        >
          正在跟隨
        </button>

        <button
          v-else
          class="follow-btn empty-btn-style ml-4"
          @click.stop.prevent="addFollowing(user.id)"
        >
          跟隨
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
import { Toast } from "./../utils/helpers"
import usersAPI from "./../apis/users"

export default {
  name: "UserProfileOther",
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
      this.user = newValue
    }
  },
  methods: {
    async addFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFollowing({ userId });
        console.log("following users=", data);
        this.user.isFollowed = true
        this.$emit('fromUserProfileOther')

        this.isProcessing = false;
      } catch (error) {
        console.error(error.message);
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "目前無法跟隨使用者，請稍後再試",
        });
      }
    },
    async removeFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.removeFollowing({ userId });
        console.log("following users=", data);
        this.user.isFollowed = false
        this.$emit('fromUserProfileOther')

        this.isProcessing = false;
      } catch (error) {
        console.error(error.message);
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "目前無法取消跟隨使用者，請稍後再試",
        });
      }
    },
  },
}
</script>