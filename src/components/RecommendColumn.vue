<template>
  <div class="recommendAccount-panel">
    <div class="recommendAccount-element d-flex align-items-center">
      <img
        class="user-headshot"
        src="../assets/User Photo.png"
        alt="個人頭像"
      />

      <div>
        <a href="#" class="user-name">{{ recommendUser.name }}</a>
        <h4 class="user-acount"><span>@</span>{{ recommendUser.account }}</h4>
      </div>

      <button
        v-if="recommendUser.isFollowed"
        class="follow-btn empty-btn-style"
        type="submit"
        @click.stop.prevent="removeFollowing(recommendUser.id)"
      >
        正在跟隨
      </button>

      <button
        v-else
        class="follow-btn empty-btn-style"
        type="submit"
        @click.stop.prevent="addFollowing(recommendUser.id)"
      >
        跟隨
      </button>
    </div>
  </div>
</template>

<script>
import { Toast } from "./../utils/helpers";
import usersAPI from "./../apis/users";

export default {
  name: "RecommendColumn",
  props: {
    initialRecommenduser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      recommendUser: this.initialRecommenduser,
      isProcessing: false,
    };
  },
  methods: {
    async addFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFollowing({ userId });
        console.log("following users=", data);
        // if (data.status !== 'success') {
        //   throw new Error(data.message)
        // }

        this.recommendUser = {
          ...this.recommendUser,
          isFollowed: true,
        };
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
        // if (data.status === 'error') {
        //   throw new Error(data.message)
        // }

        this.recommendUser = {
          ...this.recommendUser,
          isFollowed: false,
        };
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
