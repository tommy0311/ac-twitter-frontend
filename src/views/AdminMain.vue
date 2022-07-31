<template>
  <div class="d-flex">
    <NavBar />
    <div class="admin-main-wrapper">
      <NavpillHeader />
      <AdminTweetList />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import NavpillHeader from "../components/NavpillHeader.vue";
import AdminTweetList from "../components/AdminTweetList.vue";

export default {
  name: "AdminMain",
  components: {
    NavBar,
    NavpillHeader,
    AdminTweetList,
  },
};
</script>
