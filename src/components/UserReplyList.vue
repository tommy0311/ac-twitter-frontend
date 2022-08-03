<template>
  <div>
    <div
      v-for="reply in replies"
      id="user-reply-list-container"
      :key="reply.id"
    >
      <img
        class="user-headshot"
        :src="reply.User.avatar | emptyImage"
        alt="個人頭像"
      >
      <div class="ml-2">
        <div class="d-flex align-items-center">
          <router-link
            v-if="reply.isCurrentUser"
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

          <p class="post-time">
            {{ reply.createdAt | fromNow }}
          </p>
        </div>
        <div class="reply-to-who-container d-flex mt-2">
          回覆
          <span class="reply-to-who-acount ml-1">
            <span>@</span>
            {{ reply.Tweet.User.account }}
          </span>
        </div>
        <p class="tweet-content mt-2">
          {{ reply.comment }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
export default {
  name: "UserReplyList",
  mixins: [fromNowFilter,emptyImageFilter],
  props: {
    initialReplies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      replies: this.initialReplies
    }
  },
  watch: {
    initialReplies (newValue) {
      this.replies = {
        ...this.replies,
        ...newValue
      }
    }
  }
}
</script>