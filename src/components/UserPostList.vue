<template>
  <div>
    <div
      v-for="tweet in tweets"
      id="user-post-list-container"
      :key="tweet.id"
    >
      <img
        class="user-headshot"
        src="../assets/User Photo.png"
        alt="個人頭像"
      >
      <div class="ml-2">
        <div class="d-flex align-items-center">
          <a
            href="#"
            class="user-name"
          >
            {{ tweet.User.name }}
          </a>
          <p class="user-acount-for-post ml-2">
            <span>@</span>
            {{ tweet.User.account }}
            <span> • </span>
          </p>
          <p class="post-time">
            {{ tweet.createdAt | fromNow }}
          </p>
        </div>
        <p class="tweet-content mt-2">
          {{ tweet.description }}
        </p>
        <div class="tweet-icon-show-pannel d-flex mt-1">
          <a
            href=""
            class="d-flex align-items-center"
          >
            <img
              src="../assets/reply.png"
              alt=""
              class="tweet-icon-show"
            >
            <span class="reply-number ml-1">
              {{ tweet.replyCount }}
            </span>
          </a>
          <a
            href=""
            class="d-flex align-items-center ml-8"
          >
            <img
              src="../assets/like.png"
              alt=""
              class="tweet-icon-show"
            >
            <span class="like-number ml-1">
              {{ tweet.likeCount }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
export default {
  name: "UserPostList",
  mixins: [fromNowFilter],
  props: {
    initialTweets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tweets: this.initialTweets
    }
  },
  watch: {
    initialTweets (newValue) {
      this.tweets = {
        ...this.tweets,
        ...newValue
      }
    }
  }
}
</script>

