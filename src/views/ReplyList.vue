<template>
  <div class="d-flex template-center-alignment">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
      <ReplyPost
        :initial-tweetid="tweetId"
      />
      <PostReplyList
      />
    </div>

    <div id="recommendColumn-container">
      <div class="recommendHeader mt-4">
        <h1>推薦跟隨</h1>
      </div>
      <RecommendColumn
        v-for="recommendUser in recommendUsers"
        :key="recommendUser.id"
        :initial-recommenduser="recommendUser"
      />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import RecommendColumn from "../components/RecommendColumn.vue";
import NavpillHeader from "../components/NavpillHeader.vue";
import ReplyPost from "../components/ReplyPost.vue";
import PostReplyList from "../components/PostReplyList.vue";
import { Toast } from './../utils/helpers'
import usersAPI from './../apis/users'
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
      recommendUsers: [],
      isLoading: true
    }
  },
  created () {
    const { tweetId = ''} = this.$route.query // from components/TweetList.vue
    // console.log('tweetId=', tweetId)
    this.passTweetId(Number(tweetId))
    this.fetchRecommendUsers()
  },
  methods: {
    passTweetId (tweetId) {
      this.tweetId = tweetId
    },
    async fetchRecommendUsers() {
      try {
        this.isLoading = true

        const { data } = await usersAPI.getUserFollowings({userId: this.currentUser.id})
        const userFollowings = data
        const responseUsers = await usersAPI.getTopUsers()
        this.recommendUsers = responseUsers.data.map( user => {
          return (
            {
              ...user,
              isFollowed: userFollowings.some(f => f.followingId === user.id)
            }
          )
        })

        this.isLoading = false
      } catch (error) {
        console.error(error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得 RecommendUsers 資料，請稍後再試'
        })
      }
    },
  }
};
</script>
