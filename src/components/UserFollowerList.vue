<template>
  <div>
    <div
      v-for="follower in followers"
      id="user-follower-list-container"
      :key="follower.followerId"
    >
      <button
        v-if="follower.isFollowed"
        class="user-follow-btn empty-btn-style-active"
        type="submit"
        @click.stop.prevent="removeFollowing(follower.followerId)"
      >
        正在跟隨
      </button>
      <button
        v-else
        class="user-follow-btn empty-btn-style"
        type="submit"
        @click.stop.prevent="addFollowing(follower.followerId)"
      >
        跟隨
      </button>

      <img
        class="user-headshot"
        :src="follower.avatar | emptyImage"
        alt="個人頭像"
      >
      <div class="ml-2">
        <div class="">
          <router-link
            :to="{
              name: 'user-id-tweets',
              params: { userId: follower.followerId }
            }"
            class="user-name"
          >
            {{ follower.name }}
          </router-link>
          <div class="user-acount">
            <span>@</span>
            {{ follower.account }}
          </div>
        </div>
        <p class="tweet-content mt-4">
          {{ follower.introduction }}
        </p>
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
  name: "UserFollowerList",
  mixins: [emptyImageFilter],
  props: {
    initialFollowers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      followers: this.initialFollowers
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch: {
    initialFollowers (newValue) {
      this.followers = {
        ...this.followers,
        ...newValue
      }
      this.followers = newValue
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
        console.log("add @UserFollowerList=", data);
        const obj = JSON.parse(JSON.stringify(this.followers))
        const arr = Object.values(obj)
        for(const user of arr ) {
          if(user.followerId === userId) {
            user.isFollowed = true
            break
          }
        }
        this.followers = arr
        this.$emit('fromFollowerList')
        
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
        console.log("remove @UserFollowerList=", data);
        const obj = JSON.parse(JSON.stringify(this.followers))
        const arr = Object.values(obj)
        for(const user of arr ) {
          if(user.followerId === userId) {
            user.isFollowed = false
            break
          }
        }
        this.followers = arr
        this.$emit('fromFollowerList')

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
  }
}
</script>