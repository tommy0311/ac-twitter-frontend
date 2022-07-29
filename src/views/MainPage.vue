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
  },
  methods: {
    async fetchTweets () {
      try {
        this.isLoading = true

        const { data } = await usersAPI.getUserFollowings({userId: this.currentUser.id})
        const userFollowings = data

        const responseUsers = await usersAPI.getTopUsers()
        
        this.recommendUsers = responseUsers.data.map( user => {
          return (
            {
              ...user,
              isFollowed: userFollowings.some(f => f.followingId === user.id)
            }
          )
        })
        console.log('responseUsers=', this.recommendUsers)

        const responseTweets = await tweetsAPI.getTweets()
        this.tweets = Array.from( responseTweets.data )

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
