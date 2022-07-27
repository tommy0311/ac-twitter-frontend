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

    <div id="recommendColumn-container">
      <div class="recommendHeader mt-4">
        <h1>推薦跟隨</h1>
      </div>
      <RecommendColumn
        v-for="recommendUser in recommendUsers"
        :key="recommendUser.id"
        :initial-recommenduser="recommendUser"
      />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import RecommendColumn from "../components/RecommendColumn.vue";
import NavpillHeader from "../components/NavpillHeader.vue";
import WrittingTweet from "../components/WrittingTweet.vue";
import TweetList from "../components/TweetList.vue";
import tweetsAPI from './../apis/tweets'
import usersAPI from './../apis/users'
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
      recommendUsers: [],
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

        const responseUsers = await usersAPI.getTopUsers()
        this.recommendUsers = Array.from( responseUsers.data )
        // console.log('responseUsers=', this.recommendUsers)

        const responseTweets = await tweetsAPI.getTweets()
        // console.log('responseTweets=', responseTweets)
        this.tweets = Array.from( responseTweets.data )
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
