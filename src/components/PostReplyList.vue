<template>
  <ul
    id="reply-post-list-container"
    class="d-flex flex-column"
  >
    <li
      v-for="reply in replies"
      :key="reply.id"
    >
      <img 
        class="user-headshot"
        :src=" reply.User.avatar | emptyImage "
        alt="個人頭像"
      >

      <div class="ml-2">
        <div class="d-flex align-items-center">
          <router-link
            :to="{
              name: 'user-id-tweets',
              params: { userId: reply.User.id }
            }"
            class="user-name"
          >
            {{ reply.User.name }}
          </router-link>
          <p class="user-acount-for-post ml-2">
            <span>@</span>{{ reply.User.account }}<span> • </span>
          </p>
          <p class="post-time">
            {{ reply.createdAt | fromNow }}
          </p>
        </div>
        <div class="reply-to-who-container d-flex mt-2">
          回覆
          <span class="reply-to-who-acount ml-1">
            <span>@</span>
            {{ tweet.User.account }}
          </span>
        </div>
        <p class="tweet-content mt-2">
          {{ reply.comment }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import store from './../store'
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'

export default {
  name: "PostReplyList",
  mixins: [fromNowFilter,emptyImageFilter],
  props: {
    initialTweetid: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tweet: this.initialTweet,
      replies: [],
      currentUser: store.state.currentUser
    };
  },
  created () {
    this.fetchReplies({ tweetId: this.initialTweetid })
    this.fetchTweet({ tweetId: this.initialTweetid })
  },
  methods: {
    async fetchReplies ({ tweetId }) {
      try {
        this.isLoading = true

        const { data } = await tweetsAPI.getReplies({
          tweetId: tweetId,
        })
        this.replies = data
        console.log('this.replies=', this.replies)
        this.isLoading = false
      } catch (error) {
        console.error(error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得 Replies 資料，請稍後再試'
        })
      }
    },
    async fetchTweet ({ tweetId }) {
      try {
        this.isLoading = true
        
        const { data } = await tweetsAPI.getTweet({
          tweetId: tweetId,
        })
        this.tweet = data
        console.log('tweet=', this.tweet)
        this.isLoading = false
      }catch (error) {
        console.error(error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得 Tweet 資料，請稍後再試'
        })
      }
    },
  }
}
</script>