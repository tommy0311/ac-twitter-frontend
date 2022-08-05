<template>
  <div class="d-flex justify-content-center">
    <NavBar
      :show-modal="showModal"
      :initial-main-page="isMainPage"
    />
    <div class="main-wrapper">
      <NavpillHeaderMain
        :initial-main-page="isMainPage"
      />
      <WrittingTweet @fetch-tweet="fetchTweets" />
      <div
        class="container-for-scroll scrollbar"
      >
        <TweetList
          v-for="tweet in tweets"
          :key="tweet.id"
          :initial-tweet="tweet"
        />
      </div>
    </div>

    <div id="recommendColumn-container">
      <div class="recommendHeader">
        <h1>推薦跟隨</h1>
      </div>
      <RecommendColumn
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

export default {
  name: 'MainPage',
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeaderMain,
    WrittingTweet,
    TweetList,
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
        // console.log('this.tweets=', this.tweets)
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
        this.isLoading = true

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

        this.isLoading = false
      } catch (error) {
        console.error(error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得 RecommendUsers 資料，請稍後再試',
        })
      }
    },    
  },
}
</script>