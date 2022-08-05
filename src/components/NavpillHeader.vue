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
        :to="{
          name: 'user-tweets' // 導引至 個人推文頁
        }"
        class="navpillHeader-title"
      >
        {{ currentUser.name }}
      </router-link>
      <p class="post-number-hint">
        {{ currentUser.tweetsCount }}
        <span>推文</span>
      </p>
    </div>

    <PopoutReply
      v-if="replyModalShow"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PopoutReply from '../components/PopoutReply.vue';

export default {
  name: "NavpillHeader",
  components: { PopoutReply },
  data () {
    return {
      isLoading: true,
    }
  },
  computed: {
    ...mapState(['currentUser','replyModalShow'])
  },
  created () {
    console.log('replyModalShow=', this.replyModalShow)
  },
};
</script>