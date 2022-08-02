<template>
  <div class="d-flex justify-content-center">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
      <ReplyPost
        :initial-tweetid="tweetId"
      />

      <PostReplyList
        v-for="reply in replies"
        :key="reply.id"
        :initial-reply="reply"
        :initial-tweetid="tweetId"
      />
    </div>

    <div id="recommendColumn-container">
      <div class="recommendHeader mt-4">
        <h1>推薦跟隨</h1>
      </div>
      <RecommendColumn
        :initial-recommend-users="recommendUsers"
        @fromRCF="updatePage"
      />
    </div>
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

export default {
  name: "ReplyList",
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeader,
    ReplyPost,
    PostReplyList,
  },
  data () {
    return {
      replies: [],
      tweetId: -1,
      currentUser: store.state.currentUser,
      recommendUsers: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created () {
    const { tweetId = ''} = this.$route.query // from components/TweetList.vue
    // console.log('tweetId=', tweetId)
    this.passTweetId(Number(tweetId));
    this.fetchRecommendUsers();
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
        this.isLoading = true;

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

        this.isLoading = false;
      } catch (error) {
        console.error(error);
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得 RecommendUsers 資料，請稍後再試",
        });
      }
    },
    async fetchReplies (tweetId) {
      try {
        this.isLoading = true

        const { data } = await tweetsAPI.getReplies({
          tweetId,
        })
        this.replies = data
        console.log('this.replies=', this.replies)
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
  }
};
</script>
