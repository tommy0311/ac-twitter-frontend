<template>
  <div>
    <div
      v-for="like in likes"
      id="user-like-list-container"
      :key="like.id"
    >
      <img
        class="user-headshot"
        :src="like.Tweet.User.avatar | emptyImage"
        alt="個人頭像"
      >
      <div class="ml-2">
        <div class="d-flex align-items-center">
          <a
            href="#"
            class="user-name"
          >
            {{ like.Tweet.User.name }}
          </a>
          <p class="user-acount-for-post ml-2">
            <span>@</span>
            {{ like.Tweet.User.account }}
            <span> • </span>
          </p>
          <p class="post-time">
            {{ like.Tweet.createdAt | fromNow }}
          </p>
        </div>
        <p class="tweet-content mt-2">
          {{ like.Tweet.description }}
        </p>
        <div class="tweet-icon-show-pannel d-flex mt-1">
          <div class="d-flex align-items-center">
            <button>
              <img
                src="../assets/reply.png"
                alt=""
                class="tweet-icon-show"
              >
            </button>
            <span class="reply-number ml-1">
              {{ like.Tweet.replyCount }}
            </span>
          </div>
          <div class="d-flex align-items-center ml-8">
            <button>
              <img
                src="../assets/like.png"
                alt=""
                class="tweet-icon-show"
              >
            </button>
            <span class="like-number ml-1">
              {{ like.Tweet.likeCount }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
export default {
  name: "UserLikeList",
  mixins: [fromNowFilter,emptyImageFilter],
  props: {
    initialLikes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      likes: this.initialLikes
    }
  },
  watch: {
    initialLikes (newValue) {
      this.likes = {
        ...this.likes,
        ...newValue
      }
    }
  }
}
</script>
