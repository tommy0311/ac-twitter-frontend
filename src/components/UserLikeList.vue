<template>
  <div>
    <div
      v-for="like in likes"
      id="user-like-list-container"
      :key="like.id"
    >
      <router-link
        v-if="like.isCurrentUser"
        :to="{
          name: 'user-tweets' // 導引至 UserSelf.vue
        }"
      >
        <img
          class="user-headshot"
          :src="like.Tweet.User.avatar | emptyImage"
          alt="個人頭像"
        >
      </router-link>
      <router-link
        v-else
        :to="{
          name: 'user-id-tweets', // 導引至 UserOther.vue
          params: { userId: like.Tweet.UserId }
        }"
      >
        <img
          class="user-headshot"
          :src="like.Tweet.User.avatar | emptyImage"
          alt="個人頭像"
        >
      </router-link>

      <div class="ml-2">
        <div class="d-flex align-items-center">
          <router-link
            v-if="like.isCurrentUser"
            :to="{
              name: 'user-tweets' // 導引至 UserSelf.vue
            }"
            class="user-name"
          >
            {{ like.Tweet.User.name }}
            <span class="user-acount-for-post ml-2">
              <span>@</span>
              {{ like.Tweet.User.account }}
              <span> • </span>
            </span>
          </router-link>

          <router-link
            v-else
            :to="{
              name: 'user-id-tweets', // 導引至 UserOther.vue
              params: { userId: like.Tweet.UserId }
            }"
            class="user-name"
          >
            {{ like.Tweet.User.name }}
            <span class="user-acount-for-post ml-2">
              <span>@</span>
              {{ like.Tweet.User.account }}
              <span> • </span>
            </span>
          </router-link>

          <p class="post-time">
            {{ like.Tweet.createdAt | fromNow }}
          </p>
        </div>

        <router-link
          :to="{
            name: 'replylist',
            query: {
              tweetId: like.Tweet.id
            }
          }"
        >
          <p class="tweet-content mt-2">
            {{ like.Tweet.description }}
          </p>
        </router-link>

        <div class="tweet-icon-show-pannel d-flex mt-1">
          <div class="d-flex align-items-center">
            <button>
              <img
                src="../assets/reply.png"
                alt=""
                class="tweet-icon-show"
              >
            </button>
            <span class="reply-number ml-1">
              {{ like.Tweet.replyCount }}
            </span>
          </div>
          <div class="d-flex align-items-center ml-8">
            <button
              v-if="like.isLiked"
            >
              <img
                src="../assets/likedx2.png"
                alt="likedx2.png"
                class="tweet-icon-show like-icon"
                @click.stop.prevent="unLike(like.TweetId)"
              >
            </button>
            <button
              v-else
            >
              <img
                src="../assets/like.png"
                alt="like.png"
                class="tweet-icon-show like-icon"
                @click.stop.prevent="addLike(like.TweetId)"
              >
            </button>

            <span class="like-number ml-1">
              {{ like.Tweet.likeCount }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from './../utils/mixins'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  name: "UserLikeList",
  mixins: [fromNowFilter,emptyImageFilter],
  props: {
    initialLikes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      likes: this.initialLikes
    }
  },
  watch: {
    initialLikes (newValue) {
      this.likes = {
        ...this.likes,
        ...newValue
      }
      this.likes = newValue
    }
  },
  methods: {
    async addLike (tweetId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addLike({ tweetId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.$emit('fromUserLikeList')

        this.isProcessing = false
      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法對 Tweet 按 Like，請稍後再試'
        })
      }
    },
    async unLike (tweetId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.unLike({ tweetId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.$emit('fromUserLikeList')

        this.isProcessing = false
      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法對 Tweet 取消 Like，請稍後再試'
        })
      }
    }
  }
}
</script>
