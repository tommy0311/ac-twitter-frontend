<template>
  <div class="d-flex justify-content-center">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeaderMain />
      <WrittingTweet />
      <div class="container-for-scroll scrollbar">
        <TweetList />
      </div>
    </div>

    <div id="recommendColumn-container">
      <div class="recommendHeader">
        <h1>推薦跟隨</h1>
      </div>
      <RecommendColumn />
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import RecommendColumn from '../components/RecommendColumn.vue'
import NavpillHeaderMain from '../components/NavpillHeaderMain.vue'
import WrittingTweet from '../components/WrittingTweet.vue'
import TweetList from '../components/TweetList.vue'


export default {
  name: 'MainPage',
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeaderMain,
    WrittingTweet,
    TweetList,
  }  
}
</script>
