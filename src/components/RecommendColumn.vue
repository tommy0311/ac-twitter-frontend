<template>
  <div>
    <div
      class="recommendAccount-panel"
      v-for="recommendUser in recommendUsers"
      :key="recommendUser.id"
    >
      <div class="recommendAccount-element d-flex align-items-center">
        <img
          class="user-headshot"
          src="../assets/Photo2.png"
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
  </div>
</template>

<script>
import { Toast } from "./../utils/helpers";
import usersAPI from "./../apis/users";
import { mapState } from 'vuex'

export default {
  name: "RecommendColumn",
  data() {
    return {
      recommendUsers: [],
      isProcessing: false,
    };
  },
  created () {
    this.fetchRecommendUsers()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchRecommendUsers() {
      try {
        this.isLoading = true

        const { data } = await usersAPI.getUserFollowings({userId: this.currentUser.id})
        const userFollowings = data
        const responseUsers = await usersAPI.getTopUsers()
        this.recommendUsers = responseUsers.data.map( user => {
          return (
            {
              ...user,
              isFollowed: userFollowings.some(f => f.followingId === user.id)
            }
          )
        })

        this.isLoading = false
      } catch (error) {
        console.error(error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得 RecommendUsers 資料，請稍後再試'
        })
      }
    },
    async addFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFollowing({ userId });
        console.log("following users=", data);

        this.recommendUsers = this.recommendUsers.map( user => {
          if(user.id !== userId) {
            return user
          }
          else {
            return (
              {
                ...user,
                isFollowed: true
              }
            )
          }
        })

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

        this.recommendUsers = this.recommendUsers.map( user => {
          if(user.id !== userId) {
            return user
          }
          else {
            return (
              {
                ...user,
                isFollowed: false
              }
            )
          }
        })

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
