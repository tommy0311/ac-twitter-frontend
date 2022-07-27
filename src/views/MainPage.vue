<template>
  <div class="d-flex template-center-alignment">
    <NavBar />
    <div class="main-wrapper ml-2 mr-2">
      <NavpillHeader />
      <WrittingTweet />
      <TweetList
        v-for="tweet in tweets"
        :key="tweet.id"
        :initial-tweet="tweet"
      />
      <p>123</p>
    </div>
    <RecommendColumn />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import RecommendColumn from "../components/RecommendColumn.vue";
import NavpillHeader from "../components/NavpillHeader.vue";
import WrittingTweet from "../components/WrittingTweet.vue";
import TweetList from "../components/TweetList.vue";
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

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
      isLoading: true
    }
  },
  created () {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets () {
      try {
        this.isLoading = true
        const response = await tweetsAPI.getTweets()
        // console.log('response=', response)
        this.tweets = Array.from( response.data )
        // console.log('Likes=', this.tweets[0].Likes)
        // console.log('Replies=', this.tweets[0].Replies)

        this.isLoading = false
      } catch (error) {
        console.log('error', error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得 twitter 資料，請稍後再試'
        })
      }
    }
  }
};
</script>
