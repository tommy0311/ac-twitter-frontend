<template>
  <div id="navpillHeader-container">
    <div class="navpill-info-container flex-column">
      <p class="navpillHeader-title">
        <span v-if="isMainPage">首頁</span>
        <span v-if="isAdminMain">推文清單</span>
        <span v-if="isAdminUsers">使用者列表</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavpillHeaderMain',
  props: {
    initialMainPage: {
      type: Boolean,
      default: false
    },
    initialAdminMain: {
      type: Boolean,
      default: false
    },
    initialAdminUsers: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
        isMainPage: this.initialMainPage,
        isAdminMain: this.initialAdminMain,
        isAdminUsers: this.initialAdminUsers
    };
  },
  watch: {
    initialMainPage (newValue) {
      this.isMainPage = newValue
    },
    initialAdminMain (newValue) {
      this.isAdminMain = newValue
    },
    initialAdminUsers (newValue) {
      this.isAdminUsers = newValue
    },
  },
}
</script>