<template>
  <div>
    <div
      v-for="following in followings"
      id="user-follower-list-container"
      :key="following.followingId"
    >
      <button
        v-if="following.isFollowed"
        class="user-follow-btn empty-btn-style-active"
        type="submit"
        @click.stop.prevent="removeFollowing(following.followingId)"
      >
        正在跟隨
      </button>
      <button
        v-else
        class="user-follow-btn empty-btn-style"
        type="submit"
        @click.stop.prevent="addFollowing(following.followingId)"
      >
        跟隨
      </button>

      <router-link
        v-if="currentUser.id === following.followingId"
        :to="{
          name: 'user-tweets' // 導引至 UserSelf.vue
        }"
      >
        <img
          class="user-headshot"
          :src="following.avatar | emptyImage"
          alt="個人頭像"
        >
      </router-link>
      <router-link
        v-else
        :to="{
          name: 'user-id-tweets', // 導引至 UserOther.vue
          params: { userId: following.followingId }
        }"
      >
        <img
          class="user-headshot"
          :src="following.avatar | emptyImage"
          alt="個人頭像"
        >
      </router-link>

      <div class="ml-2">
        <router-link
          v-if="currentUser.id === following.followingId"
          :to="{
            name: 'user-tweets' // 導引至 UserSelf.vue
          }"
        >
          <span class="user-name">
            {{ following.name }}
          </span>
          <div class="user-acount">
            <span>@</span>
            {{ following.account }}
          </div>
          <p class="tweet-content mt-4">
            {{ following.introduction }}
          </p>
        </router-link>
        <router-link
          v-else
          :to="{
            name: 'user-id-tweets', // 導引至 UserOther.vue
            params: { userId: following.followingId }
          }"
        >
          <span class="user-name">
            {{ following.name }}
          </span>
          <div class="user-acount">
            <span>@</span>
            {{ following.account }}
          </div>
          <p class="tweet-content mt-4">
            {{ following.introduction }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
import { Toast } from "./../utils/helpers"
import usersAPI from "./../apis/users"
import { mapState } from "vuex"

export default {
  name: "UserFollowingList",
  mixins: [emptyImageFilter],
  props: {
    initialFollowings: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      followings: this.initialFollowings
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch: {
    initialFollowings (newValue) {
      this.followings = {
        ...this.followings,
        ...newValue
      }
      this.followings = newValue
    }
  },
  methods: {
    async addFollowing(userId) {
      try {
        if(userId === this.currentUser.id) {
          Toast.fire({
            icon: "error",
            title: "無法跟隨自己",
          });
          return
        }
        this.isProcessing = true;
        const { data } = await usersAPI.addFollowing({ userId });
        console.log("data=", data);
        const obj = JSON.parse(JSON.stringify(this.followings))
        const arr = Object.values(obj)
        for(const user of arr ) {
          if(user.followingId === userId) {
            user.isFollowed = true
            break
          }
        }
        this.followings = arr
        this.$emit('fromFollowingList')

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
        console.log("data=", data);
        const obj = JSON.parse(JSON.stringify(this.followings))
        const arr = Object.values(obj)
        for(const user of arr ) {
          if(user.followingId === userId) {
            user.isFollowed = false
            break
          }
        }
        this.followings = arr
        this.$emit('fromFollowingList')

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
