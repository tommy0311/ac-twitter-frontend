<template>
  <div class="d-flex template-center-alignment">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
      <UserProfile />
      <UserPostList />
    </div>
    <RecommendColumn />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import RecommendColumn from "../components/RecommendColumn.vue";
import NavpillHeader from "../components/NavpillHeader.vue";
import UserProfile from "../components/UserProfile.vue";
import UserPostList from "../components/UserPostList.vue";

export default {
  name: "UserSelf",
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeader,
    UserProfile,
    UserPostList,
  },
};
</script>
