<template>
  <div class="d-flex justify-content-center">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />

      <!-- 包含 追隨者、正在追隨 兩個分頁 -->
      <NavpillUserFollow
        :initial-user="user"
      />

      <div class="scrollbar">
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
      <RecommendColumn
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

export default {
  name: "UserFollow",
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeader,
    NavpillUserFollow,
  },
beforeRouteUpdate (to, from, next) {
    const { userId } = to.params
    this.fetchUser(userId)
    this.userId = Number(userId),
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
      userId: -1,
      followers: [],
      followings: [],
      currentUserFollowings: [],
      recommendUsers: [],
      isProcessing: false
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created () {
    const { userId } = this.$route.params
    this.fetchUser(userId),
    this.userId = Number(userId),
    this.fetchRecommendUsers();
  },
  methods: {
    updatePage() {
      this.fetchFollowingsFollowers(this.userId)
      this.fetchRecommendUsers()
    },
    async fetchFollowingsFollowers (userId) {
      try {
        const followersData = await usersAPI.getUserFollowers({ userId })
        const followingsData = await usersAPI.getUserFollowings({ userId })

        const currentUserFollowings = await usersAPI.getUserFollowings({ userId: this.currentUser.id })
        this.currentUserFollowings = currentUserFollowings.data

        this.followers = followersData.data.map((user) => {
          return {
            ...user,
            isFollowed: this.currentUserFollowings.some((f) => f.followingId === user.followerId)
          }
        })
        this.followings = followingsData.data.map((user) => {
          return {
            ...user,
            isFollowed: this.currentUserFollowings.some((f) => f.followingId === user.followingId)
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
    // fetch 三個東西 getUser getUserFollowings getUserFollowers
    async fetchUser (userId) {
      try {
        const followingsData = await usersAPI.getUserFollowings({ userId })
        const followings = followingsData.data

        const followersData = await usersAPI.getUserFollowers({ userId })
        const followers = followersData.data

        console.log('followings=', followings)
        console.log('followers=', followers)

        const { data } = await usersAPI.getUser({ userId })

        const {
          id,
          account,
          email,
          name,
          avatar,
          cover,
          introduction,
          role
        } = data

        this.user = {
          ...this.user,
          id,
          account,
          email,
          name,
          avatar,
          cover,
          introduction,
          role,
          followingCount: followings.length,
          followerCount: followers.length
        }

      } catch (error) {
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取得 User 資料，請稍後再試'
        })
      }
    },
    async fetchRecommendUsers() {
      try {
        this.isLoading = true;

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

        this.isLoading = false;
      } catch (error) {
        console.error(error);
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得 RecommendUsers 資料，請稍後再試",
        });
      }
    },
  }
}
</script>
