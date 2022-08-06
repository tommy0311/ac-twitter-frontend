<template>
  <div id="writtingTweet-container">
    <div class="writtingTweet-pannel d-flex">
      <router-link
        :to="{
          name: 'user-tweets' // 導引至 個人全部推文頁
        }"
      >
        <img
          class="user-headshot"
          :src=" currentUser.avatar | emptyImage "
          alt="個人頭像"
        >
      </router-link>
      <form
        class="user-writing-post-form ml-2"
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
          <div class="d-flex align-items-center">
            <span
              v-show="tweetLength"
              style="margin-right:10px;"
              class="tweet-length-sign"
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
        </div>
      </form>
    </div>    
  </div>
</template>

<script>
import tweetAPI from '../apis/tweets'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex';
import { emptyImageFilter } from "./../utils/mixins"

export default {
  name: 'WrittingTweet',
  mixins: [emptyImageFilter],
  data() {
    return {
      tweet: '',
      tweetLength: 0
    }
  },
  computed: {
    ...mapState(["currentUser","reply"]),
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
