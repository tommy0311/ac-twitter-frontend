<template>
  <div class="d-flex template-center-alignment">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
      <ReplyPost />
      <PostReplyList />
    </div>
    <RecommendColumn />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import RecommendColumn from "../components/RecommendColumn.vue";
import NavpillHeader from "../components/NavpillHeader.vue";
import ReplyPost from "../components/ReplyPost.vue";
import PostReplyList from "../components/PostReplyList.vue";
import { Toast } from './../utils/helpers'
import tweetsAPI from './../apis/tweets'

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
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
      isLoading: true
    }
  },
  created () {
    const { tweetId = ''} = this.$route.query // from components/TweetList.vue
    console.log('tweetId=', tweetId)
    // this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId })
  },
  methods: {
    async fetchTweet () {
      try {
        this.isLoading = true
        const response = await tweetsAPI.getRestaurants({
          // page: queryPage,
          // categoryId: queryCategoryId
        })
        console.log('response=', response)
      }catch (error) {
        console.log('error', error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得 Tweet 資料，請稍後再試'
        })
      }
    }
  }
};
</script>
