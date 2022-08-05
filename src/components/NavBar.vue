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
              name: 'main' // 導引至 主頁
            }"
            class="nav-link"
          >
            <div
              v-if="isMainPage"
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
              v-if="isMainPage"
              class="navbar-index-active"
            >
              首頁
            </span>
            <span
              v-else
              class="navbar-index"
            >
              首頁
            </span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{
              name: 'user-tweets' // 導引至 個人推文頁
            }"
            class="nav-link"
          >
            <div
              v-if="isProfile"
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
              v-if="isProfile"
              class="navbar-index-active"
            >
              個人資料
            </span>
            <span
              v-else
              class="navbar-index"
            >
              個人資料
            </span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{
              name: 'setting' // 導引至 設定(前台)
            }"
            class="nav-link"
          >
            <div
              v-if="isSetting"
              class="icon-container"
            >
              <img
                src="../assets/Group_big-removebg-preview.png"
                alt=""
                class="icon-size setting-icon"
              >
            </div>
            <div
              v-else
              class="icon-container"
            >
              <img
                src="../assets/icon_setting.png"
                alt=""
                class="icon-size setting-icon"
              >
            </div>
            <span
              v-if="isSetting"
              class="navbar-index-active"
            >
              設定
            </span>
            <span
              v-else
              class="navbar-index"
            >
              設定
            </span>
          </router-link>
        </li>
      </ul>
    </template>

    <button
      class="tweet-btn main-btn-style"
      @click="showModal"
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
import PopoutWritingTweet from '../components/PopoutWritingTweet.vue';

export default {
  name: 'NavBar',
  components: { PopoutWritingTweet },
  props: {
    initialMainPage: {
      type: Boolean,
      default: false
    },
    initialProfile: {
      type: Boolean,
      default: false
    },
    initialSetting: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isModalShown: false,
      isMainPage: this.initialMainPage,
      isProfile: this.initialProfile,
      isSetting: this.initialSetting
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  watch: {
    initialMainPage (newValue) {
      this.isMainPage = newValue
    },
    initialProfile (newValue) {
      this.isProfile = newValue
    },
    initialSetting (newValue) {
      this.isSetting = newValue
    },
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
