<template>
  <div class="d-flex center-alignment">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
      <WrittingTweet />
      <TweetList />
    </div>
    <RecommendColumn />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import RecommendColumn from "../components/RecommendColumn.vue";
import NavpillHeader from "../components/NavpillHeader.vue";
import WrittingTweet from "../components/WrittingTweet.vue";
import TweetList from "../components/TweetList.vue";

export default {
  name: "MainPage",
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeader,
    WrittingTweet,
    TweetList,
  },
};
</script>
<style>
.center-alignment {
  margin: 0 auto;
}
</style>
