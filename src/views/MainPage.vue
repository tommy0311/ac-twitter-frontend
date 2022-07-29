<template>
  <div class="d-flex">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
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
import NavpillHeader from "../components/NavpillHeader.vue"
import WrittingTweet from "../components/WrittingTweet.vue"
import TweetList from "../components/TweetList.vue"
import tweetsAPI from './../apis/tweets'
// import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import store from './../store'

export default {
  name: "MainPage",
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeader,
    WrittingTweet,
    TweetList,
  },
  data () {
    return {
      tweets: [],
      recommendUsers: [],
      isLoading: true,
      currentUser: store.state.currentUser
    }
  },
  created () {
    this.fetchTweets()
    this.fetchRecommendUsers()
  },
  methods: {
    async fetchRecommendUsers() {
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
