<template>
  <div id="admin-tweet-element-container">
    <img
      class="user-headshot"
      src="../assets/Photo2.png"
      alt="個人頭像"
    >
    <div class="ml-2">
      <div class="d-flex">
        <a
          href="#"
          class="user-name"
        >{{ tweet.User.name }}</a>
        <p class="user-acount-for-post ml-2">
          <span>@</span>{{ tweet.User.account }}<span> • </span>
        </p>
        <p class="post-time">
          {{ tweet.createdAt | fromNow }}
        </p>
      </div>
      <p class="tweet-content mt-2">
        {{ tweet.description }}
      </p>
      <router-link
        :to="{
          name: 'replylist',
          query: {
            tweetId: tweet.id,
          },
        }"
      >
        <img
          class="delete-icon"
          src="../assets/delete_list.png"
          alt="刪除該文按鈕"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
// import { emptyImageFilter } from './../utils/mixins'
// import usersAPI from './../apis/users'
// import { Toast } from './../utils/helpers'
import { fromNowFilter } from "./../utils/mixins";

export default {
  name: "TweetList",
  // mixins: [emptyImageFilter],
  mixins: [fromNowFilter],
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
