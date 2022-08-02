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
    </div>
  </div>
</template>

<script>
import { localeSupport, emptyImageFilter } from "./../utils/mixins"
import tweetsAPI from './../apis/tweets'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import { mapState } from "vuex"

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
      tweet: this.initialTweet,
      currentUserLikes: []
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created () {
    this.fetchTweet({ tweetId: this.initialTweetid })
  },
  methods: {
    async fetchTweet ({ tweetId }) {
      try {
        this.isLoading = true
        
        const currentUserLikes = await usersAPI.getUserLikes({userId: this.currentUser.id});
        this.currentUserLikes = currentUserLikes.data

        const { data } = await tweetsAPI.getTweet({
          tweetId: tweetId,
        })
        this.tweet = data
        this.tweet.isLiked = this.currentUserLikes.some(l => l.TweetId === this.tweet.id) ? true : false
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
