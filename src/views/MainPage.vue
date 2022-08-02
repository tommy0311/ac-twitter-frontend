<template>
  <div class="d-flex justify-content-center">
    <NavBar :show-modal="showModal" />
    <div class="main-wrapper">
      <NavpillHeaderMain />
      <WrittingTweet @fetch-tweet="fetchTweets" />
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
import NavBar from '../components/NavBar.vue'
import RecommendColumn from '../components/RecommendColumn.vue'
import NavpillHeaderMain from '../components/NavpillHeaderMain.vue'
import WrittingTweet from '../components/WrittingTweet.vue'
import TweetList from '../components/TweetList.vue'
import tweetsAPI from './../apis/tweets'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import { mapState } from "vuex"

export default {
  name: 'MainPage',
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeaderMain,
    WrittingTweet,
    TweetList,
  },
  data() {
    return {
      tweets: [],
      likes: [],
      isLoading: true,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets() {
      try {
        this.isLoading = true;

        const likes = await usersAPI.getUserLikes({userId: this.currentUser.id});
        this.likes = likes.data

        const responseTweets = await tweetsAPI.getTweets();
        this.tweets = responseTweets.data
        // console.log('this.tweets=', this.tweets)
        this.tweets = this.tweets.map( tweet => {
          if( this.likes.some(l => l.TweetId === tweet.id) ) {
            return {
              ...tweet,
              isLiked: true
            }
          } else {
            return {
              ...tweet,
              isLiked: false
            }
          }
        })

        this.isLoading = false;
      } catch (error) {
        console.error(error);
        this.isLoading = false;
        Toast.fire({
          icon: 'error',
          title: '無法取得 Tweets 資料，請稍後再試',
        });
      }
    }
  },
};
</script>
