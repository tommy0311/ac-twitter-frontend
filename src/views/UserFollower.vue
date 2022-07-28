<template>
  <div class="d-flex template-center-alignment">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
      <NavpillUser />
      <div class="y-scroll">
        <router-view />
      </div>
    </div>
    <RecommendColumn />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import RecommendColumn from "../components/RecommendColumn.vue";
import NavpillHeader from "../components/NavpillHeader.vue";
import NavpillUser from "../components/NavpillUser.vue";

export default {
  name: "UserSelf",
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeader,
    NavpillUser,
  },
};
</script>
