<template>
  <div id="tweet-element-container">
    <img
      class="user-headshot"
      :src="tweet.User.avatar | emptyImage"
      alt="個人頭像"
    >
    <div class="ml-2">
      <div class="d-flex">
        <router-link
          :to="{
            name: 'user-id-tweets',
            params: { userId: tweet.User.id }
          }"
          class="user-name"
        >
          {{ tweet.User.name }}
        </router-link>
        <p class="user-acount-for-post ml-2">
          <span>@</span>{{ tweet.User.account }}<span> • </span>
        </p>
        <p class="post-time">
          {{ tweet.createdAt | fromNow }}
        </p>
      </div>

      <router-link
        :to="{
          name: 'replylist',
          query: {
            tweetId: tweet.id
          }
        }"
      >
        <p class="tweet-content mt-2">
          {{ tweet.description }}
        </p>
      </router-link>

      <div class="tweet-icon-show-pannel d-flex mt-1">
        <div class="d-flex align-items-center">
          <img
            src="../assets/reply.png"
            alt=""
            class="tweet-icon-show"
          >
          <span class="reply-number ml-1">{{ tweet.replyCount }}</span>
        </div>
        <div class="d-flex align-items-center ml-8">
          <img
            src="../assets/like.png"
            alt=""
            class="tweet-icon-show"
          >
          <span class="like-number ml-1">{{ tweet.likeCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
import { fromNowFilter } from "./../utils/mixins";

export default {
  name: "TweetList",
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweet: this.initialTweet,
      isProcessing: false,
    };
  },
};
</script>
