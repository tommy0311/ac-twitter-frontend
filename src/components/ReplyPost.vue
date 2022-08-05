<template>
  <div id="reply-post-container">
    <div class="d-flex">
      <img
        class="user-headshot"
        :src=" tweet.User.avatar | emptyImage "
        alt="個人頭像"
      >
      <div class="flex-column ml-2">
        <a
          href="#"
          class="user-name"
        >
          {{ tweet.User.name }}
        </a>
        <p class="user-acount-for-post">
          <span>@</span>
          {{ tweet.User.account }}
        </p>
      </div>
    </div>
    <p class="tweet-content mt-2">
      {{ tweet.description }}
    </p>
    <div class="tweet-post-time-pannel d-flex mt-2">
      <p class="post-time">
        {{ tweet.createdAt | localeSupport }}
      </p>
    </div>
    <div class="reply-like-number-container d-flex mt-2">
      <p>
        <span class="tweet-reply-number">
          {{ tweet.replyCount }}
        </span> 回覆
      </p>
      <p class="ml-6">
        <span class="tweet-like-number">
          {{ tweet.likeCount }}
        </span> 喜歡次數
      </p>
    </div>
    <div class="tweet-icon-show-pannel d-flex mt-1">
      <router-link 
        :to="{
          name: 'reply-modal'
        }"
      >
        <img
          src="../assets/reply.png"
          alt="回覆按鈕"
          class="tweet-icon-show"
        >
      </router-link>

      <button
        v-if="tweet.isLiked"
      >
        <img
          src="../assets/likedx2.png"
          alt="likedx2.png"
          class="tweet-icon-show like-icon"
          @click.stop.prevent="unLike(tweet.id)"
        >
      </button>
      <button
        v-else
      >
        <img
          src="../assets/like.png"
          alt="like.png"
          class="tweet-icon-show like-icon"
          @click.stop.prevent="addLike(tweet.id)"
        >
      </button>
    </div>
  </div>
</template>

<script>
import { localeSupport, emptyImageFilter } from "./../utils/mixins"

export default {
  name: "ReplyPost",
  mixins: [localeSupport,emptyImageFilter],
  props: {
    tweet: {
      type: Object,
      require: true,
    },
    addLike: {
      type: Function,
      require: true,
    },
    unLike: {
      type: Function,
      require: true
    }
  },
}
</script>
