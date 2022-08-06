<template>
  <div class="">
    <LoadingSpinner v-if="isLoading" />
    <div
      v-for="user in users"
      v-else
      id="admin-user-Profile-card"
      :key="user.id"
      class="flex-column"
      style="display: inline-block; margin-top: 16px; margin-left: 16px;"
    >
      <img
        class="profile-background-img"
        :src=" user.cover | emptyCover "
        alt="cover"
      >
      <img
        class="profile-headshot"
        :src=" user.avatar | emptyImage "
        alt="個人頭像"
      >
      <div class="profile-info-container text-center">
        <h4 class="user-name mt-8">
          {{ user.name }}
        </h4>
        <p class="user-acount">
          <span>@</span>
          {{ user.account }}
        </p>
        <!-- <div class="text-canter"></div> -->
        <div class="user-info-icon-pannel d-flex mt-5 justify-content-center">
          <span
            class="d-flex align-items-center"
          >
            <img
              src="../assets/quill pen.png"
              alt=""
              class="user-info-icon"
            >
            <span class="post-amount ml-2">
              {{ user.TweetCount }}
            </span>
          </span>
          <span
            class="d-flex align-items-center ml-5"
          >
            <img
              src="../assets/like.png"
              alt=""
              class="user-info-icon"
            >
            <span class="like-amount ml-2">
              {{ user.likeCount }}
            </span>
          </span>
        </div>
        <div class="d-flex mt-3 text-center mb-6 justify-content-center">
          <span
            class="user-follow-info"
          >
            <span class="following-number">
              {{ user.followingCount }}
            </span>
            <span class="following-number">個</span>跟隨中
          </span>
          <span
            class="user-follow-info"
          >
            <span class="follower-number ml-2">
              {{ user.followerCount }}
            </span>
            <span class="following-number">位</span>跟隨者
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization';
import { Toast } from "./../utils/helpers";
import { emptyImageFilter } from './../utils/mixins'
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  name: "AdminUserCard",
  components: {
    LoadingSpinner
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      users: [],
      isProcessing: false,
      isLoading: true,
    };
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers(){
      try {
        this.isLoading = true
        const {data} = await authorizationAPI.getUsers()
        this.users = data
        this.isLoading = false
      } catch (error) {
        console.error(error.message);
        this.isLoading = false
        Toast.fire({
          icon: "error",
          title: "無法取得 Users 資料",
        });
      }
    }
  }
}
</script>
