<template>
  <div id="navpillHeader-container">
    <a href="javascript:history.back()">
      <img
        class="arrow-icon"
        src="../assets/arrow.png"
        alt="回到上一頁" 
      >
    </a>

    <div class="navpill-info-container flex-column">
      <router-link
        to="/user"
        class="navpillHeader-title"
      >
        {{ currentUser.name }}
      </router-link>
      <p class="post-number-hint">
        {{ currentUser.tweetsCount }}
        <span>推文</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "NavpillHeader",
  data () {
    return {
      isLoading: true,
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
};
</script>