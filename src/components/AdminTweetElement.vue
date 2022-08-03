<template>
  <div>
    <div
      v-for="tweet in tweets"
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
          @click.stop.prevent="deleteTweet(tweet.id, tweet.description, tweet.User.account)"
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

export default {
  name: "AdminTweetElement",
  mixins: [fromNowFilter, emptyImageFilter],
  data() {
    return {
      tweets: [],
      isProcessing: false,
    };
  },
  watch: {
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    async deleteTweet(id, description, account){
      try {
        if(confirm(`你想刪除 ${account} 的這篇 ${description} 推文嗎？`)) {
          console.log('yes')
          const response = await authorizationAPI.deleteTweet({tweetId: id})
          if (response.status !== 'error') {
            Toast.fire({
              icon: 'success',
              title: '刪除推文成功'
            })
          }
        } else{
          console.log('no')
        }
        this.tweets = this.tweets.filter(t=>t.id !== id)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除推文，請稍後再試'
        })
      }
    },
    async fetchTweets(){
      try {
        const tweets = await tweetsAPI.getTweets()
        this.tweets = tweets.data.map(t=> ({
          ...t,
          description: t.description ? t.description.substring(0,50) : ''
        }))
        console.log('AdminMain tweets=', this.tweets)
      } catch (error) {
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得 Tweets 資料",
        });
      }
    }
  },
};
</script>
