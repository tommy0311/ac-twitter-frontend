<template>
  <div>
    <div id="admin-tweet-element-container">
      <img
        class="user-headshot"
        src="../assets/User Photo.png"
        alt="個人頭像"
      >
      <div class="ml-2">
        <div class="d-flex">
          <a
            href="#"
            class="user-name"
          >Pizza Hut</a>
          <p class="user-acount-for-post ml-2">
            <span>@</span>pizzahut<span> • </span>
          </p>
          <p class="post-time">
            3小時
          </p>
        </div>
        <p class="tweet-content mt-2">
          By default, flex items will all try to fit onto one line. You can change
          that and allow the items to wrap as needed with this property
        </p>        
      </div>
      <button>
        <img
          src="../assets/delete_list.png"
          class="delete-icon-size"
          alt=""
        >
      </button>        
    </div>
  </div>
</template>

<script>
import { Toast } from "./../utils/helpers"
import usersAPI from "./../apis/users"
import { mapState } from "vuex"
import { emptyImageFilter } from './../utils/mixins'

export default {
  name: "AdminTweetElement",
  mixins: [emptyImageFilter],
  data() {
    return {
      recommendUsers: [],
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchRecommendUsers();
  },
  methods: {
    async fetchRecommendUsers() {
      try {
        this.isLoading = true;

        const { data } = await usersAPI.getUserFollowings({
          userId: this.currentUser.id,
        });
        const userFollowings = data;
        const responseUsers = await usersAPI.getTopUsers();
        this.recommendUsers = responseUsers.data.map((user) => {
          return {
            ...user,
            isFollowed: userFollowings.some((f) => f.followingId === user.id),
          };
        });

        this.isLoading = false;
      } catch (error) {
        console.error(error);
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得 RecommendUsers 資料，請稍後再試",
        });
      }
    },
    async addFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFollowing({ userId });
        console.log("following users=", data);

        this.recommendUsers = this.recommendUsers.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              isFollowed: true,
            };
          }
        });

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

        this.recommendUsers = this.recommendUsers.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              isFollowed: false,
            };
          }
        });

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
};
</script>
