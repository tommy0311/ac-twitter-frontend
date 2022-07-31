<template>
  <div id="reply-post-container">
    <div class="d-flex">
      <img
        class="user-headshot"
        :src=" tweet.User.avatar | emptyImage "
        alt="個人頭像"
      >
      <div class="flex-column ml-2">
        <a
          href="#"
          class="user-name"
        >
          {{ tweet.User.name }}
        </a>
        <p class="user-acount-for-post">
          <span>@</span>
          {{ tweet.User.account }}
        </p>
      </div>
    </div>
    <p class="tweet-content mt-2">
      {{ tweet.description }}
    </p>
    <div class="tweet-post-time-pannel d-flex mt-2">
      <p class="post-time">
        {{ tweet.createdAt | localeSupport }}
      </p>
    </div>
    <div class="reply-like-number-container d-flex mt-2">
      <p>
        <span class="tweet-reply-number">
          {{ tweet.replyCount }}
        </span> 回覆
      </p>
      <p class="ml-6">
        <span class="tweet-like-number">
          {{ tweet.likeCount }}
        </span> 喜歡次數
      </p>
    </div>
    <div class="tweet-icon-show-pannel d-flex mt-1">
      <a href="#">
        <img
          src="../assets/reply.png"
          alt="回覆按鈕"
          class="tweet-icon-show"
        >
      </a>

      <a href="#">
        <img
          src="../assets/like.png"
          alt="愛心按鈕"
          class="tweet-icon-show like-icon"
        >
      </a>
    </div>
  </div>
</template>

<script>
import { localeSupport } from "./../utils/mixins"
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import { emptyImageFilter } from './../utils/mixins'

export default {
  name: "ReplyPost",
  mixins: [localeSupport,emptyImageFilter],
  props: {
    initialTweetid: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tweet: this.initialTweet
    };
  },
  created () {
    this.fetchTweet({ tweetId: this.initialTweetid })
  },
  methods: {
    async fetchTweet ({ tweetId }) {
      try {
        this.isLoading = true
        
        const { data } = await tweetsAPI.getTweet({
          tweetId: tweetId,
        })
        this.tweet = data
        // console.log('tweet=', this.tweet)

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
};
</script>
