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
      <button
        class="d-flex"
        @click.stop.prevent="showModal(tweet.id, tweet.User.avatar, tweet.User.name, tweet.User.account, tweet.createdAt, tweet.description)"
      >
        <img
          src="../assets/reply.png"
          alt="回覆按鈕"
          class="tweet-icon-show"
        >
      </button>

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
import { mapState } from 'vuex'

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
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    showModal (tweetId, toAvatar, toName, toAccount, toCreatedAt, toDescription) {
      this.$store.commit('setReply', {
        tweetId,
        toAvatar,
        toName,
        toAccount,
        toCreatedAt,
        toDescription,
        myAvatar: this.currentUser.avatar
      })
    }
  },
}
</script>
