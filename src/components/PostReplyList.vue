<template>
  <div
    id="reply-post-list-container"
    class=""
  >
    <router-link
      v-if="isCurrentUser"
      :to="{
        name: 'user-tweets' // 導引至 UserSelf.vue
      }"
    >
      <img 
        class="user-headshot"
        :src=" reply.User.avatar | emptyImage "
        alt="個人頭像"
      >
    </router-link>
    <router-link
      v-else
      :to="{
        name: 'user-id-tweets', // 導引至 UserOther.vue
        params: { userId: reply.User.id }
      }"
    >
      <img 
        class="user-headshot"
        :src=" reply.User.avatar | emptyImage "
        alt="個人頭像"
      >
    </router-link>

    <div class="tweet-wrapper ml-2">
      <div class="d-flex align-items-center">
        <router-link
          v-if="isCurrentUser"
          :to="{
            name: 'user-tweets' // 導引至 UserSelf.vue
          }"
          class="user-name"
        >
          {{ reply.User.name }}

          <span class="user-acount-for-post ml-2">
            <span>@</span>
            {{ reply.User.account }}
            <span> • </span>
          </span>
        </router-link>

        <router-link
          v-else
          :to="{
            name: 'user-id-tweets', // 導引至 UserOther.vue
            params: { userId: reply.User.id }
          }"
          class="user-name"
        >
          {{ reply.User.name }}

          <span class="user-acount-for-post ml-2">
            <span>@</span>
            {{ reply.User.account }}
            <span> • </span>
          </span>
        </router-link>

        <p class="post-time">
          {{ reply.createdAt | fromNow }}
        </p>
      </div>
      <div class="reply-to-who-container d-flex mt-2">
        回覆
        <span class="reply-to-who-acount ml-1">
          <span>@</span>
          {{ tweet.User.account }}
        </span>
      </div>
      <p class="tweet-content mt-2">
        {{ reply.comment }}
      </p>
    </div>
  </div>
</template>

<script>
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
import { fromNowFilter, emptyImageFilter } from './../utils/mixins'

export default {
  name: "PostReplyList",
  mixins: [fromNowFilter,emptyImageFilter],
  props: {
    initialTweetid: {
      type: Number,
      required: true,
    },
    initialReply: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      tweet: {},
      reply: this.initialReply,
      isCurrentUser: false
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.isCurrentUser = this.reply.UserId === this.currentUser.id ? true : false
    this.fetchTweet({ tweetId: this.initialTweetid })
  },
  methods: {
    async fetchTweet ({ tweetId }) {
      try {
        this.isLoading = true
        
        const { data } = await tweetsAPI.getTweet({
          tweetId: tweetId,
        })
        this.tweet = data
        console.log('tweet=', this.tweet)
        this.isLoading = false
      }catch (error) {
        console.error(error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得 Tweet 資料，請稍後再試'
        })
      }
    },
  }
}
</script>