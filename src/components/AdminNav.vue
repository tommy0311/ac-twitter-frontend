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

    <template v-if="1 ===1">
      <ul class="nav-list">
        <li>
          <router-link
            :to="{
              name: 'admin-main' // 導引至 全部推文頁
            }"
            class="nav-link"
          >
            <div
              v-if="isTweetsList"
              class="icon-container"
            >
              <img
                src="../assets/atIndex@2x.png"
                alt="houseActive"
                class="icon-size house-icon"
              >
            </div>
            <div
              v-else
              class="icon-container"
            >
              <img
                src="../assets/icon_home.png"
                alt="house"
                class="icon-size house-icon"
              >
            </div>
            <span
              v-if="isTweetsList"
              class="navbar-index-active"
            >
              推文清單
            </span>
            <span
              v-else
              class="navbar-index"
            >
              推文清單
            </span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{
              name: 'admin-users' // 導引至 全部使用者頁
            }"
            class="nav-link"
          >
            <div
              v-if="isUsersList"
              class="icon-container"
            >
              <img
                src="../assets/atUser_big-removebg-preview.png"
                alt=""
                class="icon-size profile-icon"
              >
            </div>
            <div
              v-else
              class="icon-container"
            >
              <img
                src="../assets/icon_user.png"
                alt=""
                class="icon-size profile-icon"
              >
            </div>
            <span
              v-if="isUsersList"
              class="navbar-index-active"
            >
              使用者列表
            </span>
            <span
              v-else
              class="navbar-index"
            >
              使用者列表
            </span>
          </router-link>
        </li>
      </ul>
    </template>

    <template v-if="isAuthenticated">
      <ul class="nav-list nav-list-bottom">
        <li>
          <a
            href="#"
            class="nav-link"
          >
            <div class="icon-container">
              <img
                src="../assets/logout_black-removebg-preview.png"
                alt=""
                class="icon-size logout-icon"
              >
            </div>
            <span
              class="navbar-index"
              @click="logout"
            >
              登出
            </span>
          </a>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    initialTweetsList: {
      type: Boolean,
      default: false
    },
    initialUsersList: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isTweetsList: this.initialTweetsList,
      isUsersList: this.initialUsersList,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  watch: {
    initialTweetsList (newValue) {
      this.isTweetsList = newValue
    },
    initialUsersList (newValue) {
      this.isUsersList = newValue
    },
  },
  methods: {
    logout() {
        this.$store.commit("revokeAuthentication");
        this.$router.push("/login");
    },
  },
};
</script>