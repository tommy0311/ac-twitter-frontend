<template>
  <div class="d-flex">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeaderMain />
      <WrittingTweet />
      <TweetList
        v-for="tweet in tweets"
        :key="tweet.id"
        :initial-tweet="tweet"
      />     
    </div>

    <div id="recommendColumn-container">
      <div class="recommendHeader mt-4">
        <h1>推薦跟隨</h1>
      </div>
      <RecommendColumn />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue"
import RecommendColumn from "../components/RecommendColumn.vue"
import NavpillHeaderMain from "../components/NavpillHeaderMain.vue"
import WrittingTweet from "../components/WrittingTweet.vue"
import TweetList from "../components/TweetList.vue"
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  name: "MainPage",
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeaderMain,
    WrittingTweet,
    TweetList,
  },
  data () {
    return {
      tweets: [],
      isLoading: true,
    }
  },
  created () {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets () {
      try {
        this.isLoading = true

        const responseTweets = await tweetsAPI.getTweets()
        this.tweets = Array.from( responseTweets.data )

        this.isLoading = false
      } catch (error) {
        console.error(error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得 Tweets 資料，請稍後再試'
        })
      }
    }
  }
};
</script>
