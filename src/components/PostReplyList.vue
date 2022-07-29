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
        src="../assets/Photo2.png" 
        alt="個人頭像"
      />

      <div class="ml-2">
        <div class="d-flex align-items-center">
          <a href="#" class="user-name">{{ reply.User.name }}</a>
          <p class="user-acount-for-post ml-2">
            <span>@</span>{{ reply.User.account }}<span> • </span>
          </p>
          <p class="post-time">{{ reply.createdAt | fromNow }}</p>
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

export default {
  name: "PostReplyList",
  props: {
    initialTweetid: {
      type: Number,
      required: true,
    },
  },
  mixins: [fromNowFilter],
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
        // console.log('data=', data)
        this.replies = data

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