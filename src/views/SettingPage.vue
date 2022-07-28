<template>
  <div class="d-flex">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
      <SettingForm />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import NavpillHeader from "../components/NavpillHeader.vue";
import SettingForm from "../components/SettingForm.vue";

export default {
  name: "MainPage",
  components: {
    NavBar,
    NavpillHeader,
    SettingForm,
  },
};
</script>
