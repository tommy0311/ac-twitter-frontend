<template>
  <div class="d-flex">
    <NavBar />
    <div class="admin-main-wrapper">
      <NavpillHeader />     
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import NavpillHeader from "../components/NavpillHeader.vue";


export default {
  name: "AdminMain",
  components: {
    NavBar,
    NavpillHeader,
    
  },
};
</script>