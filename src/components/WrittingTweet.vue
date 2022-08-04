<template>
  <div id="writtingTweet-container">
    <div class="writtingTweet-pannel d-flex">
      <img
        class="user-headshot"
        src="../assets/Photo2.png"
        alt="個人頭像"
      >
      <form
        class="user-writing-post-form"
        @submit.prevent.stop="handleSubmit"
      >
        <textarea
          id="user-writting-post"
          v-model="tweet"
          class="user-writting-post"
          placeholder="有什麼新鮮事"
          required
        />
        <div class="d-flex justify-content-end align-items-end">
          <span
            v-show="tweetLength"
            style="margin-right:10px;"
          >
            {{ tweetLength }}/140
          </span>
          <button
            class="post-btn second-btn-style"
            type="submit"
          >
            推文
          </button>
        </div>
      </form>
    </div>    
  </div>
</template>

<script>
import tweetAPI from '../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  name: 'WrittingTweet',
  data() {
    return {
      tweet: '',
      tweetLength: 0
    }
  },
  watch: {
    tweet: "showTweetLength"
  },
  methods: {
    showTweetLength () {
      this.tweetLength = this.tweet.length
    },
    async handleSubmit() {
      try {
        const trimmedTweet = this.tweet.trim()
        if(trimmedTweet.length>140) {
          Toast.fire({
            icon: 'error',
            title: '字數不可超過140字',
          })
          return
        }
        if (!trimmedTweet.length) {
          Toast.fire({
            icon: 'error',
            title: '內容不可空白',
          })
          return
        }
        await tweetAPI.postTweet(trimmedTweet)
        this.tweet = ''
        this.$emit('fetch-tweet')
        Toast.fire({
          icon: 'success',
          title: '推文成功發佈',
        })
      } catch (err) {
        // 顯示錯誤提示
        Toast.fire({
          icon: 'error',
          title: '發生錯誤，請重試。',
        })

        console.error(err.message)
      }
    },
  },
}
</script>
