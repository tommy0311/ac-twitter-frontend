<template>
  <div class="d-flex justify-content-center">
    <NavBar
      :initial-main-page="isMainPage"
    />
    <div class="main-wrapper">
      <NavpillHeader />
      <div class="container-for-scroll scrollbar">
        <ReplyPost
          :initial-tweetid="tweetId"
          :tweet="tweet"
          :add-like="addLike"
          :un-like="unLike"
        />
        <LoadingSpinner v-if="isLoading" />
        <PostReplyList
          v-for="reply in replies"
          v-else
          :key="reply.id"
          :initial-reply="reply"
          :initial-tweetid="tweetId"
        />
      </div>
    </div>

    <div id="recommendColumn-container">
      <div class="recommendHeader">
        <h1>推薦跟隨</h1>
      </div>
      <LoadingSpinner v-if="isRecommendUsersLoading" />
      <RecommendColumn
        v-else
        :initial-recommend-users="recommendUsers"
        @updateRecommendColumn="updatePage"
      />
    </div>
    <router-view
      :tweet="tweet"
      :fetch-tweet="fetchTweet"
      :fetch-replies="fetchReplies"
    />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue"
import RecommendColumn from "../components/RecommendColumn.vue"
import NavpillHeader from "../components/NavpillHeader.vue"
import ReplyPost from "../components/ReplyPost.vue"
import PostReplyList from "../components/PostReplyList.vue"
import store from './../store'
import { Toast } from './../utils/helpers'
import usersAPI from "./../apis/users"
import tweetsAPI from './../apis/tweets'
import { mapState } from "vuex"
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  name: "ReplyList",
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeader,
    ReplyPost,
    PostReplyList,
    LoadingSpinner
  },
  data () {
    return {
      replies: [],
      tweetId: -1,
      currentUser: store.state.currentUser,
      tweet: {},
      recommendUsers: [],
      isProcessing: false,
      isMainPage: true,
      isLoading: true,
      isRecommendUsersLoading: true,
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created () {
    const { tweetId = ''} = this.$route.query // from components/TweetList.vue
    this.passTweetId(Number(tweetId));
    this.fetchRecommendUsers();
    this.fetchTweet(Number(tweetId))
    this.fetchReplies(Number(tweetId));
  },
  methods: {
    passTweetId (tweetId) {
      this.tweetId = tweetId
    },
    updatePage() {
      this.fetchRecommendUsers();
    },
    async fetchRecommendUsers() {
      try {
        this.isRecommendUsersLoading = true;

        const { data } = await usersAPI.getUserFollowings({
          userId: this.currentUser.id, // need currentUser
        });
        const userFollowings = data;
        const responseUsers = await usersAPI.getTopUsers();
        this.recommendUsers = responseUsers.data.map((user) => {
          return {
            ...user,
            isFollowed: userFollowings.some((f) => f.followingId === user.id),
          };
        });

        this.isRecommendUsersLoading = false;
      } catch (error) {
        console.error(error);
        this.isRecommendUsersLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得 RecommendUsers 資料，請稍後再試",
        });
      }
    },
    async fetchTweet (tweetId) {
      try {
        const currentUserLikes = await usersAPI.getUserLikes({userId: this.currentUser.id});
        this.currentUserLikes = currentUserLikes.data

        const { data } = await tweetsAPI.getTweet({
          tweetId: tweetId,
        })
        this.tweet = data
        this.tweet.isLiked = this.currentUserLikes.some(l => l.TweetId === this.tweet.id) ? true : false

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得 Tweet 資料，請稍後再試'
        })
      }
    },
    async fetchReplies (tweetId) {
      try {
        this.isLoading = true
        const { data } = await tweetsAPI.getReplies({
          tweetId,
        })
        this.replies = data
        this.isLoading = false
      } catch (error) {
        console.error(error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得 Replies 資料，請稍後再試'
        })
      }
    },
     async addLike (tweetId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addLike({ tweetId })
        console.log('data=',data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.tweet = {
          ...this.tweet,
          isLiked: true,
          likeCount: this.tweet.likeCount+1
        }
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
        console.log('data=',data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.tweet = {
          ...this.tweet,
          isLiked: false,
          likeCount: this.tweet.likeCount-1
        }
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
};
</script>
