<template>
  <div class="wrapper">
    <div
      class="popup-background"
      @click="closeModal"
    />

    <div id="popup-writtingTweet-container">
      <div class="headerbox align-items-center">
        <button @click="closeModal">
          <img
            class="popup-cancel-icon"
            src="../assets/X.png"
            alt="取消推文視窗按鈕"
          >
        </button>
      </div>
      <div class="want-reply-post-container">
        <img
          class="user-headshot"
          :src=" reply.toAvatar | emptyImage "
          alt="個人頭像"
        >
        <div class="tweet-wrapper ml-2">
          <div class="d-flex align-items-center">
            <a 
              href="#"
              class="user-name"
            >
              {{ reply.toName }}
            </a>
            <p class="user-acount-for-post ml-2">
              <span>@</span>{{ reply.toAccount }}<span> • </span>
            </p>
            <p class="post-time">
              {{ reply.toCreatedAt | fromNow }}
            </p>
          </div>
          <p class="tweet-content mt-2">
            {{ reply.toDescription }}
          </p>
          <div class="reply-to-who-container d-flex mt-3">
            回覆給
            <span class="reply-to-who-acount ml-1">
              <span>@</span>
              {{ reply.toAccount }}
            </span>
          </div>
        </div>
      </div>

      <div class="writtingTweet-pannel d-flex">
        <img
          class="user-headshot"
          :src=" currentUser.avatar | emptyImage "
          alt="個人頭像"
        >
        <form
          class="user-writing-post-form"
          @submit.prevent.stop="handleSubmit"
        >
          <textarea
            id="user-writting-post"
            v-model="comment"
            class="user-writting-post"
            placeholder="推你的回覆"
            required
          />
          <span
            v-show="commentLength"
          >
            {{ commentLength }}/140
          </span>
          <span
            class="popup-error-text"
            :class="{ show: isErrorExceed }"
          >字數不可超過140字</span>
          <span
            class="popup-error-text"
            :class="{ show: isErrorEmpty }"
          >內容不可空白</span>
          <div class="d-flex justify-content-end align-items-end">
            <button
              class="post-btn second-btn-style"
              type="submit"
            >
              推文
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from "./../utils/mixins"
import { Toast } from './../utils/helpers'
import replyAPI from '../apis/replies'
import { mapState } from 'vuex';

export default {
  name: 'PopoutReply',
   mixins: [fromNowFilter, emptyImageFilter],
   beforeRouteUpdate (to, from, next) {
    next()
  },
   props: {
    tweet: {
      type: Object,
      required: true,
    },
    fetchTweet: {
      type: Function,
      require: true,
    },
    fetchReplies: {
      type: Function,
      require: true,
    }
  },
  data () {
    return {
      comment: '',
      commentLength: 0,
      isErrorExceed: false,
      isErrorEmpty: false,
    }
  },
  computed: {
    ...mapState(["currentUser","reply"]),
  },
  watch: {
    comment: "showCommentLength"
  },
  methods: {
    closeModal() {
      this.$store.commit('closeReplyModal')
    },
    showCommentLength () {
      this.commentLength = this.comment.length
    },
     async handleSubmit() {
      try {
        const trimmedComment = this.comment.trim()
        if (!trimmedComment.length) {
          this.isErrorEmpty = true
          return
        }
        if (trimmedComment.length > 140) {
          this.isErrorExceed = true
          return
        }
        await replyAPI.postReply(this.reply.tweetId, trimmedComment)
        Toast.fire({
          icon: 'success',
          title: '成功回覆推文',
        })
        this.closeModal()
        this.$router.go()
        // this.$router.go(-1)
        // this.fetchTweet(this.tweet.id)
        // this.fetchReplies(this.tweet.id)
      } catch (err) {
        // 顯示錯誤提示
        Toast.fire({
          icon: 'error',
          title: '回覆推文發生錯誤，請重試。',
        })

        console.error(err.message)
      }
    }
  }
}
</script>