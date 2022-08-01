<template>
  <div class="d-flex justify-content-center">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
      <ReplyPost
        :initial-tweetid="tweetId"
      />
      <PostReplyList
        :initial-tweetid="tweetId"
      />
    </div>

    <div id="recommendColumn-container">
      <div class="recommendHeader mt-4">
        <h1>推薦跟隨</h1>
      </div>
      <RecommendColumn />
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
      tweetId: -1,
      currentUser: store.state.currentUser,
      isLoading: true
    }
  },
  created () {
    const { tweetId = ''} = this.$route.query // from components/TweetList.vue
    // console.log('tweetId=', tweetId)
    this.passTweetId(Number(tweetId))
  },
  methods: {
    passTweetId (tweetId) {
      this.tweetId = tweetId
    },
  }
};
</script>
