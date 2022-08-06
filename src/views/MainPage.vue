<template>
  <div class="d-flex justify-content-center">
    <NavBar
      :initial-main-page="isMainPage"
    />

    <div class="main-wrapper">
      <NavpillHeaderMain
        :initial-main-page="isMainPage"
      />      
      <div
        class="container-for-scroll scrollbar"
      >
        <WrittingTweet @fetch-tweet="fetchTweets" />
        <LoadingSpinner v-if="isLoading" />
        <TweetList
          v-for="tweet in tweets"
          v-else
          :key="tweet.id"
          :initial-tweet="tweet"
        />
      </div>
    </div>

    <div id="recommendColumn-container">
      <div class="recommendHeader mt-4">
        <h1>推薦跟隨</h1>
      </div>
      <LoadingSpinner v-if="isRecommendUsersLoading" />
      <RecommendColumn
        v-else
        :initial-recommend-users="recommendUsers"
        @updateRecommendColumn="updatePage"
      />
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import RecommendColumn from '../components/RecommendColumn.vue'
import NavpillHeaderMain from '../components/NavpillHeaderMain.vue'
import WrittingTweet from '../components/WrittingTweet.vue'
import TweetList from '../components/TweetList.vue'
import tweetsAPI from './../apis/tweets'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  name: 'MainPage',
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeaderMain,
    WrittingTweet,
    TweetList,
    LoadingSpinner
  },
  provide() {
    return {
      fetchTweets: this.fetchTweets,
    }
  },
  data() {
    return {
      tweets: [],
      likes: [],
      recommendUsers: [],
      isMainPage: true,
      isLoading: true,
      isRecommendUsersLoading: true,
    }
  },
  computed: {
    ...mapState(['currentUser']),
  },
  created() {
    this.fetchTweets()
    this.fetchRecommendUsers()
  },
  methods: {
    updatePage() {
      this.fetchRecommendUsers()
    },
    async fetchTweets() {
      try {
        this.isLoading = true

        const likes = await usersAPI.getUserLikes({ userId: this.currentUser.id })
        this.likes = likes.data

        const responseTweets = await tweetsAPI.getTweets()
        this.tweets = responseTweets.data
        this.tweets = this.tweets.map(tweet => {
          if (this.likes.some(l => l.TweetId === tweet.id)) {
            return {
              ...tweet,
              isLiked: true,
            }
          } else {
            return {
              ...tweet,
              isLiked: false,
            }
          }
        })

        this.isLoading = false
      } catch (error) {
        console.error(error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得 Tweets 資料，請稍後再試',
        })
      }
    },
    async fetchRecommendUsers() {
      try {
        this.isRecommendUsersLoading = true

        const { data } = await usersAPI.getUserFollowings({
          userId: this.currentUser.id, // need currentUser
        })
        const userFollowings = data
        const responseUsers = await usersAPI.getTopUsers()
        this.recommendUsers = responseUsers.data.map(user => {
          return {
            ...user,
            isFollowed: userFollowings.some(f => f.followingId === user.id),
          }
        })

        this.isRecommendUsersLoading = false
      } catch (error) {
        console.error(error)
        this.isRecommendUsersLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得 RecommendUsers 資料，請稍後再試',
        })
      }
    },
  },
}
</script>


