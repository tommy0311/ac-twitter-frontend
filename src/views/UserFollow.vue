<template>
  <div class="d-flex justify-content-center">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
      <!-- 包含 追隨者、正在追隨 兩個分頁 -->
      <NavpillUserFollow
        :initial-user="user"
        :initial-follower-active="isFollowerActive"
        :initial-following-active="isFollowingActive"
      />
      <div class="container-for-scroll scrollbar">
        <router-view
          :initial-followers="followers"
          :initial-followings="followings"
          @fromFollowingList="updatePage"
          @fromFollowerList="updatePage"
        />
      </div>
    </div>
    <div id="recommendColumn-container">
      <div class="recommendHeader">
        <h1>推薦跟隨</h1>
      </div>
      <LoadingSpinner v-if="isRecommendUsersLoading" />
      <RecommendColumn
        v-else
        :initial-recommend-users="recommendUsers"
        @updateRecommendColumn="updatePage"
      />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue"
import RecommendColumn from "../components/RecommendColumn.vue"
import NavpillHeader from "../components/NavpillHeader.vue"
import NavpillUserFollow from "../components/NavpillUserFollow.vue"
import { Toast } from '../utils/helpers'
import usersAPI from "../apis/users"
import { mapState } from "vuex"
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  name: "UserFollow",
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeader,
    NavpillUserFollow,
    LoadingSpinner
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchFollowingsFollowers(this.currentUser.id)
    this.fetchRecommendUsers()
    this.updateRouteName(to.name)
    next()
  },
  data () {
    return {
      user: {
        id: -1,
        account: '',
        email: '',
        name: '',
        avatar: '',
        cover: '',
        introduction: '',
        role: 'user',
        followingCount: -1,
        followerCount: -1
      },
      followers: [],
      followings: [],
      currentUserFollowings: [],
      recommendUsers: [],
      isFollowerActive:'',
      isFollowingActive: '',
      isProcessing: false,
      isRecommendUsersLoading: true,
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created () {
    this.user = this.currentUser
    this.fetchFollowingsFollowers(this.currentUser.id)
    this.fetchRecommendUsers()
    this.updateRouteName(this.$route.name)
  },
  methods: {
    updateRouteName(name){
      this.isFollowerActive = name === 'user-followerlist' ? 'navpill-title-active' : ''
      this.isFollowingActive = name === 'user-followinglist' ? 'navpill-title-active' : ''
    },
    updatePage() {
      this.fetchFollowingsFollowers(this.currentUser.id)
      this.fetchRecommendUsers()
    },
    async fetchFollowingsFollowers (userId) {
      try {
        const followersData = await usersAPI.getUserFollowers({ userId })

        const currentUserFollowings = await usersAPI.getUserFollowings({ userId: this.currentUser.id })
        this.currentUserFollowings = currentUserFollowings.data

        this.followers = followersData.data.map((user) => {
          return {
            ...user,
            isFollowed: this.currentUserFollowings.some((f) => f.followingId === user.followerId)
          }
        })
        this.followings = currentUserFollowings.data.map((user) => {
          return {
            ...user,
            isFollowed: true
          }
        })
      } catch (error) {
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法 fetch Follow 資料，請稍後再試'
        })
      }
    },
    async fetchRecommendUsers() {
      try {
        this.isRecommendUsersLoading = true;

        const { data } = await usersAPI.getUserFollowings({
          userId: this.currentUser.id,
        });
        const userFollowings = data;
        const responseUsers = await usersAPI.getTopUsers();
        this.recommendUsers = responseUsers.data.map((user) => {
          return {
            ...user,
            isFollowed: userFollowings.some((f) => f.followingId === user.id),
          };
        });

        this.isRecommendUsersLoading = false;
      } catch (error) {
        console.error(error);
        this.isRecommendUsersLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得 RecommendUsers 資料，請稍後再試",
        });
      }
    },
  }
}
</script>
