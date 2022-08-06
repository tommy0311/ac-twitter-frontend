<template>
  <div style="position: relative;">
    <PopoutReply
      v-if="replyModalShow"
    />
    <PopoutWritingTweet
      v-if="writingTweetModalShow"
    />
    <div id="navpillHeader-container">
      <div class="navpill-info-container flex-column">
        <p class="navpillHeader-title">
          <span v-if="isMainPage">首頁</span>
          <span v-if="isAdminMain">推文清單</span>
          <span v-if="isAdminUsers">使用者列表</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PopoutReply from '../components/PopoutReply.vue';
import PopoutWritingTweet from '../components/PopoutWritingTweet.vue';
import { mapState } from 'vuex';

export default {
  name: 'NavpillHeaderMain',
  components: { PopoutReply, PopoutWritingTweet },
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
  computed: {
    ...mapState(['replyModalShow', 'writingTweetModalShow'])
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