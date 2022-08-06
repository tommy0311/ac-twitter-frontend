<template>
  <div>
    <LoadingSpinner v-if="isLoading" />
    <div
      v-for="tweet in tweets"
      v-else
      :key="tweet.id"
    >
      <div id="admin-tweet-element-container">
        <img
          class="user-headshot"
          :src="tweet.User.avatar | emptyImage"
          alt="個人頭像"
        >
        <div class="ml-2">
          <div class="d-flex">
            <span
              class="user-name"
            >
              {{ tweet.User.name }}
            </span>
            <span class="user-acount-for-post ml-2">
              <span>@</span>
              {{ tweet.User.account }}
              <span> • </span>
            </span>

            <p class="post-time">
              {{ tweet.createdAt | fromNow }}
            </p>
          </div>
          <p class="tweet-content mt-2">
            {{ tweet.description }}
          </p>
        </div>
        <button
          @click.stop.prevent="deleteTweet(tweet.id, tweet.description, tweet.User.account, tweet.User.avatar)"
        >
          <img
            src="../assets/delete_list.png"
            class="delete-icon-size"
            alt="delete-icon"
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "./../utils/helpers";
import tweetsAPI from "./../apis/tweets";
import authorizationAPI from './../apis/authorization';
import { emptyImageFilter, fromNowFilter } from './../utils/mixins';
import { pop } from './../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  name: "AdminTweetElement",
  components: {
    LoadingSpinner
  },
  mixins: [fromNowFilter, emptyImageFilter],
  data() {
    return {
      tweets: [],
      isProcessing: false,
      isLoading: true,
    };
  },
  watch: {
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    async deleteTweet(id, description, account, avatar){
      try {
        const src = avatar ? avatar : 'https://loremflickr.com/100/100/avatar/?random=${Math.random()*100}'
        const ans = await pop.fire({
          icon: 'question',
          imageUrl: `${src}`,
          imageWidth: 80,
          imageHeight: 80,
          title: `你想刪除 @${account} 的這篇`,
          text: `${description} 推文嗎？`
        })
        if (ans.value === true) {
          const response = await authorizationAPI.deleteTweet({tweetId: id})
          if (response.status !== 'error') {
            Toast.fire({
              icon: 'success',
              title: '刪除推文成功'
            })
            this.tweets = this.tweets.filter(t=>t.id !== id)
          }
        } else {
          console.log('no')
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除推文，請稍後再試'
        })
      }
    },
    async fetchTweets(){
      try {
        this.isLoading = true
        const tweets = await tweetsAPI.getTweets()
        this.tweets = tweets.data.map(t=> ({
          ...t,
          description: t.description ? t.description.substring(0,50) : ''
        }))
        this.isLoading = false
      } catch (error) {
        console.error(error.message);
        this.isLoading = false
        Toast.fire({
          icon: "error",
          title: "無法取得 Tweets 資料",
        });
      }
    }
  },
};
</script>
