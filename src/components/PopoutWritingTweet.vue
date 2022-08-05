<template>
  <div class="wrapper">
    <router-link
      :to="{
        name: 'main' // 導引至 主頁
      }"
    >
      <div
        class="popup-background"
        @click="closeModal"
      />
    </router-link>

    <div id="popup-writtingTweet-container">
      <div class="headerbox align-items-center">
        <router-link
          :to="{
            name: 'main' // 導引至 主頁
          }"
        >
          <button @click="closeModal">
            <img
              class="popup-cancel-icon"
              src="../assets/X.png"
              alt="取消推文視窗按鈕"
            >
          </button>
        </router-link>
      </div>
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
          <span
            v-show="tweetLength"
          >
            {{ tweetLength }}/140
          </span>
          <span
            class="popup-error-text"
            :class="{ show: isErrorExceed }"
          >字數不可超過140字</span>
          <span
            class="popup-error-text"
            :class="{ show: isErrorEmpty }"
          >內容不可空白</span>
          <div class="d-flex justify-content-end align-items-end">
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
  </div>
</template>

<script>
import tweetAPI from '../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  inject: ['fetchTweets'],
  props: {
    closeModal: {
      type: Function,
    },
  },
  data() {
    return {
      isErrorExceed: false,
      isErrorEmpty: false,
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
        if (!trimmedTweet.length) {
          this.isErrorEmpty = true
          return
        }
        if (trimmedTweet.length > 140) {
          this.isErrorExceed = true
          return
        }
        await tweetAPI.postTweet(trimmedTweet)
        Toast.fire({
          icon: 'success',
          title: '推文成功發佈',
        })
        this.closeModal()
        this.fetchTweets()
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
