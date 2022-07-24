<template>
  <div class="d-flex">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
      <WrittingTweet />
      <TweetElement />
    </div>
    <RecommendColumn />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import RecommendColumn from "../components/RecommendColumn.vue";
import NavpillHeader from "../components/NavpillHeader.vue";
import WrittingTweet from "../components/WrittingTweet.vue";
import TweetElement from "../components/TweetElement.vue";

export default {
  name: "MainPage",
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeader,
    WrittingTweet,
    TweetElement,
  },
};
</script>
