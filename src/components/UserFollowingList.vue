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

      <img
        class="user-headshot"
        :src="following.avatar | emptyImage"
        alt="個人頭像"
      >
      <div class="ml-2">
        <div class="">
          <router-link
            :to="{
              name: 'user-id-tweets',
              params: { userId: following.followingId }
            }"
            class="user-name"
          >
            {{ following.name }}
          </router-link>
          <div class="user-acount">
            <span>@</span>
            {{ following.account }}
          </div>
        </div>
        <p class="tweet-content mt-4">
          {{ following.introduction }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
import { Toast } from "./../utils/helpers"
import usersAPI from "./../apis/users"

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
        this.isProcessing = true;
        const { data } = await usersAPI.addFollowing({ userId });
        console.log("add @UserFollowingList=", data);
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
        console.log("remove @UserFollowingList=", data);
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
