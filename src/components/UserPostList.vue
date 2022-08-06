<template>
  <div>
    <div
      v-for="tweet in tweets"
      id="user-post-list-container"
      :key="tweet.id"
    >
      <router-link
        v-if="tweet.isCurrentUser"
        :to="{
          name: 'user-tweets' // 導引至 UserSelf.vue
        }"
      >
        <img
          class="user-headshot"
          :src="tweet.User.avatar | emptyImage"
          alt="個人頭像"
        >
      </router-link>
      <router-link
        v-else
        :to="{
          name: 'user-id-tweets', // 導引至 UserOther.vue
          params: { userId: tweet.UserId }
        }"
      >
        <img
          class="user-headshot"
          :src="tweet.User.avatar | emptyImage"
          alt="個人頭像"
        >
      </router-link>

      <div class="tweet-wrapper ml-2">
        <div class="d-flex align-items-center">
          <router-link
            v-if="tweet.isCurrentUser"
            :to="{
              name: 'user-tweets' // 導引至 UserSelf.vue
            }"
            class="user-name"
          >
            {{ tweet.User.name }}
            <span class="user-acount-for-post ml-2">
              <span>@</span>
              {{ tweet.User.account }}
              <span> • </span>
            </span>
          </router-link>
          <router-link
            v-else
            :to="{
              name: 'user-id-tweets', // 導引至 UserOther.vue
              params: { userId: tweet.UserId }
            }"
            class="user-name"
          >
            {{ tweet.User.name }}
            <span class="user-acount-for-post ml-2">
              <span>@</span>
              {{ tweet.User.account }}
              <span> • </span>
            </span>
          </router-link>

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
          <button
            class="d-flex align-items-center"
            @click.stop.prevent="showModal(tweet.id, tweet.User.avatar, tweet.User.name, tweet.User.account, tweet.createdAt, tweet.description)"
          >
            <img
              src="../assets/reply.png"
              alt="回覆按鈕"
              class="tweet-icon-show"
            >
            <span class="reply-number ml-1">
              {{ tweet.replyCount }}
            </span>
          </button>

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
import { fromNowFilter, emptyImageFilter } from './../utils/mixins'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

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
  computed: {
    ...mapState(['currentUser'])
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
    },
    async addLike (tweetId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addLike({ tweetId })
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
        this.$emit('updateLikes')

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
        const { data } = await usersAPI.unLike({ tweetId })
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
        this.$emit('updateLikes')

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

