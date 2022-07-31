<template>
  <div id="navbar-container">
    <PopoutWritingTweet
      v-if="isModalShown"
      :show-modal="showModal"
      :close-modal="closeModal"
    />
    <img
      class="logo-img"
      src="../assets/logo@2.png"
      alt=""
    >

    <ul class="nav-list">
      <li>
        <router-link
          to="/main"
          class="nav-link"
        >
          <img
            src="../assets/icon_home.png"
            alt=""
            class="icon-container"
          >
          <img
            src="../assets/atIndex@2x.png"
            alt=""
            class="icon-container"
          >
          <span class="navbar-index">首頁</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/user"
          class="nav-link"
        >
          <img
            src="../assets/icon_user.png"
            alt=""
            class="icon-container"
          >
          <img
            src="../assets/atUser.png"
            alt=""
            class="icon-container"
          >
          <span class="navbar-index">個人資料</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/setting"
          class="nav-link"
        >
          <img
            src="../assets/icon_setting.png"
            alt=""
            class="icon-container"
          >
          <img
            src="../assets/cog.png"
            alt=""
            class="icon-container"
          >
          <span class="navbar-index">設定</span>
        </router-link>
      </li>
    </ul>
    <button
      class="tweet-btn main-btn-style"
      @click="showModal"
    >
      推文
    </button>

    <li>
      <router-link
        to="/main"
        class="nav-link"
      >
        <img
          src="../assets/icon_home.png"
          alt=""
          class="icon-container"
        >
        <img
          src="../assets/atIndex@2x.png"
          alt=""
          class="icon-container"
        >
        <span class="navbar-index">推文清單</span>
      </router-link>
    </li>
    <li>
      <router-link
        to="/user"
        class="nav-link"
      >
        <img
          src="../assets/icon_user.png"
          alt=""
          class="icon-container"
        >
        <img
          src="../assets/atUser.png"
          alt=""
          class="icon-container"
        >
        <span class="navbar-index">使用者列表</span>
      </router-link>
    </li>

    <template v-if="isAuthenticated">
      <ul class="nav-list nav-list-bottom">
        <li>
          <a
            href="#"
            class="nav-link"
          >
            <img
              src="../assets/log out.png"
              alt=""
              class="icon-container"
            >
            <span
              class="navbar-index"
              @click="logout"
            >登出</span>
          </a>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PopoutWritingTweet from '../components/PopoutWritingTweet.vue';

export default {
    components: { PopoutWritingTweet },
    data() {
        return {
            isModalShown: false,
        };
    },
    computed: {
        ...mapState(["currentUser", "isAuthenticated"]),
    },
    methods: {
        logout() {
            this.$store.commit("revokeAuthentication");
            this.$router.push("/login");
        },
        showModal() {
            this.isModalShown = true;
        },
        closeModal() {
            this.isModalShown = false;
        },
    },
};
</script>
