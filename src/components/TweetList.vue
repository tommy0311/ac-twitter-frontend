<template>
  <div id="tweet-element-container">
    <router-link
      v-if="isCurrentUser"
      :to="{
        name: 'user-tweets' // 導引至 UserSelf.vue
      }"
    >
      <img
        class="user-headshot"
        :src="tweet.User.avatar | emptyImage"
        alt="個人頭像"
      >
    </router-link>
    <router-link
      v-else
      :to="{
        name: 'user-id-tweets', // 導引至 UserOther.vue
        params: { userId: tweet.User.id }
      }"
    >
      <img
        class="user-headshot"
        :src="tweet.User.avatar | emptyImage"
        alt="個人頭像"
      >
    </router-link>

    <div class="ml-2">
      <div class="d-flex align-items-center">
        <router-link
          v-if="isCurrentUser"
          :to="{
            name: 'user-tweets' // 導引至 UserSelf.vue
          }"
          class="user-name"
        >
          {{ tweet.User.name }}
          <span class="user-acount-for-post ml-2">
            <span>@</span>
            {{ tweet.User.account }}
            <span> • </span>
          </span>
        </router-link>

        <router-link
          v-else
          :to="{
            name: 'user-id-tweets', // 導引至 UserOther.vue
            params: { userId: tweet.User.id }
          }"
          class="user-name"
        >
          {{ tweet.User.name }}
          <span class="user-acount-for-post ml-2">
            <span>@</span>
            {{ tweet.User.account }}
            <span> • </span>
          </span>
        </router-link>

        <p class="post-time">
          {{ tweet.createdAt | fromNow }}
        </p>
      </div>

      <router-link
        :to="{
          name: 'replylist',
          query: {
            tweetId: tweet.id
          }
        }"
      >
        <p class="tweet-content mt-2">
          {{ tweet.description }}
        </p>
      </router-link>

      <div class="tweet-icon-show-pannel d-flex mt-1">
        <div class="d-flex align-items-center">
          <img
            src="../assets/reply.png"
            alt=""
            class="tweet-icon-show"
          >
          <span class="reply-number ml-1">{{ tweet.replyCount }}</span>
        </div>

        <div class="d-flex align-items-center ml-8">
          <button
            v-if="tweet.isLiked"
          >
            <img
              src="../assets/likedx2.png"
              alt="likedx2.png"
              class="tweet-icon-show like-icon"
              @click.stop.prevent="unLike(tweet.id)"
            >
          </button>
          <button
            v-else
          >
            <img
              src="../assets/like.png"
              alt="like.png"
              class="tweet-icon-show like-icon"
              @click.stop.prevent="addLike(tweet.id)"
            >
          </button>
          <span class="like-number ml-1">
            {{ tweet.likeCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter, fromNowFilter } from './../utils/mixins'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  name: "TweetList",
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweet: this.initialTweet,
      isCurrentUser: false,
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.isCurrentUser = this.tweet.UserId === this.currentUser.id ? true : false
  },
  methods: {
    async addLike (tweetId) {
      try {
        this.isProcessing = true
        console.log('tweetId=',tweetId)
        const { data } = await usersAPI.addLike({ tweetId })
        console.log('data=',data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.tweet = {
          ...this.tweet,
          isLiked: true,
          likeCount: this.tweet.likeCount+1
        }
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
        console.log('tweetId=',tweetId)
        const { data } = await usersAPI.unLike({ tweetId })
        console.log('data=',data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.tweet = {
          ...this.tweet,
          isLiked: false,
          likeCount: this.tweet.likeCount-1
        }
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
};
</script>
