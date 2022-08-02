<template>
  <div>
    <div
      v-for="tweet in tweets"
      id="user-post-list-container"
      :key="tweet.id"
    >
      <img
        class="user-headshot"
        :src="tweet.User.avatar | emptyImage"
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

          <div class="d-flex align-items-center ml-8">
            <button
              v-if="tweet.isLiked"
            >
              <img
                src="../assets/likedx2.png"
                alt="likedx2.png"
                class="tweet-icon-show"
                @click.stop.prevent="unLike(tweet.id)"
              >
            </button>
            <button
              v-else
            >
              <img
                src="../assets/like.png"
                alt="like.png"
                class="tweet-icon-show"
                @click.stop.prevent="addLike(tweet.id)"
              >
            </button>
            <span class="like-number ml-1">
              {{ tweet.likeCount }}
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
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  name: "UserPostList",
  mixins: [fromNowFilter,emptyImageFilter],
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
  },
  methods: {
    async addLike (tweetId) {
      try {
        this.isProcessing = true
        console.log('tweetId=',tweetId)
        const { data } = await usersAPI.addLike({ tweetId })
        console.log('data=',data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        const obj = JSON.parse(JSON.stringify(this.tweets))
        const arr = Object.values(obj)
        this.tweets = arr.map(t=>{
          if(t.id === tweetId) {
            return {
              ...t,
              isLiked: true,
              likeCount: t.likeCount+1
            }
          } else {
            return t
          }
        })

        this.isProcessing = false
      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法對 Tweet 按 Like，請稍後再試'
        })
      }
    },
    async unLike (tweetId) {
      try {
        this.isProcessing = true
        console.log('tweetId=',tweetId)
        const { data } = await usersAPI.unLike({ tweetId })
        console.log('data=',data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        const obj = JSON.parse(JSON.stringify(this.tweets))
        const arr = Object.values(obj)
        this.tweets = arr.map(t=>{
          if(t.id === tweetId) {
            return {
              ...t,
              isLiked: false,
              likeCount: t.likeCount-1
            }
          } else {
            return t
          }
        })

        this.isProcessing = false
      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法對 Tweet 取消 Like，請稍後再試'
        })
      }
    }
  }
}
</script>

