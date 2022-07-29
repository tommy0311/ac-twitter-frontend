<template>
  <div id="navpillHeader-container">
    <a href="javascript:history.back()">
      <img
        class="arrow-icon"
        src="../assets/arrow.png"
        alt="回到上一頁" 
      />
    </a>

    <div class="navpill-info-container flex-column">
      <router-link
        router-link to="/user"
        class="navpillHeader-title"
      >
        {{currentUser.name}}
      </router-link>
      <p class="post-number-hint">
        {{tweets.length}}
        <span>推文</span>
      </p>
    </div>
  </div>
</template>

<script>
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  name: "NavpillHeader",
  data () {
    return {
      tweets: [],
      isLoading: true,
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.fetchCurrentUserTweetsCount()
  },
  methods: {
    async fetchCurrentUserTweetsCount () {
      try {
        this.isLoading = true

        const responseTweets = await tweetsAPI.getTweets()
        // console.log('responseTweets=', responseTweets.data)
        // console.log('all tweets count=', responseTweets.data.length)
        this.tweets = responseTweets.data.filter(
          tweet => tweet.UserId === this.currentUser.id
        )
        // console.log('my tweets=', this.tweets)

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