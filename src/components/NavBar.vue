<template>
  <div id="navbar-container">
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
          <div class="icon-container">
            <img
              src="../assets/icon_home.png"
              alt=""
              class="icon-size"
            >
          </div>
          <span class="navbar-index">首頁</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/user"
          class="nav-link"
        >
          <div class="icon-container">
            <img
              src="../assets/icon_user.png"
              alt=""
              class="icon-size"
            >
          </div>
          <span class="navbar-index">個人資料</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/setting"
          class="nav-link"
        >
          <div class="icon-container">
            <img
              src="../assets/icon_setting.png"
              alt=""
              class="icon-size"
            >
          </div>
          <span class="navbar-index">設定</span>
        </router-link>
      </li>
    </ul>

    <button
      class="tweet-btn main-btn-style"
      type="submit"
    >
      推文
    </button>

    <template v-if="isAuthenticated">
      <ul class="nav-list nav-list-bottom">
        <li>
          <a
            href="#"
            class="nav-link"
          >
            <div class="icon-container">
              <img
                src="../assets/log out.png"
                alt=""
                class="icon-size"
              >
            </div>
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/login");
    },
  },
};
</script>
