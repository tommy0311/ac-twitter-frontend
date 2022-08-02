<template>
  <div id="tweet-element-container">
    <img
      class="user-headshot"
      :src="tweet.User.avatar | emptyImage"
      alt="個人頭像"
    >
    <div class="ml-2">
      <div class="d-flex">
        <router-link
          :to="{
            name: 'user-id-tweets',
            params: { userId: tweet.User.id }
          }"
          class="user-name"
        >
          {{ tweet.User.name }}
        </router-link>
        <p class="user-acount-for-post ml-2">
          <span>@</span>{{ tweet.User.account }}<span> • </span>
        </p>
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
              class="tweet-icon-show"
              @click.stop.prevent="unLike(tweet.id)"
            >
          </button>
          <button
            v-else
          >
            <img
              src="../assets/like.png"
              alt="like.png"
              class="tweet-icon-show"
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
      isProcessing: false,
    };
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
