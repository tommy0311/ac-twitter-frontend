<template>
  <div class="d-flex justify-content-center">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
      <UserProfile
        :initial-user="user"
      />
      
      <!-- 包含 推文、回覆、喜歡的內容 三個分頁 -->
      <NavpillUser
        :initial-user="user"
      />

      <div class="y-scroll">
        <router-view
          :initial-tweets="tweets"
          :initial-replies="replies"
          :initial-likes="likes"
        />
      </div>
    </div>

    <div id="recommendColumn-container">
      <div class="recommendHeader mt-4">
        <h1>推薦跟隨</h1>
      </div>
      <RecommendColumnFollow
        :initial-recommend-users="recommendUsers"
        @fromRCFremove="updateFromRCFremove"
        @fromRCFadd="updateFromRCFadd"
      />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue"
import RecommendColumnFollow from "../components/RecommendColumnFollow.vue"
import NavpillHeader from "../components/NavpillHeader.vue"
import UserProfile from "../components/UserProfile.vue"
import NavpillUser from "../components/NavpillUser.vue"
import { mapState } from "vuex"
import { Toast } from './../utils/helpers'
import usersAPI from "./../apis/users"

export default {
  name: "UserSelf",
  components: {
    NavBar,
    RecommendColumnFollow,
    NavpillHeader,
    UserProfile,
    NavpillUser,
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
      tweets: [],
      replies: [],
      likes: [],
      recommendUsers: [],
      isProcessing: false
    }
  },
  computed: {
    ...mapState(["currentUser"])
  },
  watch: {
    user: "fetchUserTweetsRepliesLikes"
  },
  created () {
    this.fetchFollowingsFollowers()
    this.fetchRecommendUsers();
  },
  methods: {
    async fetchFollowingsFollowers () {
      try {
        const userId = this.currentUser.id
        // console.log('currentUser=', this.currentUser)
        const followingsData = await usersAPI.getUserFollowings({ userId })
        const followings = followingsData.data

        const followersData = await usersAPI.getUserFollowers({ userId })
        const followers = followersData.data
        // console.log('followings=', followings)
        // console.log('followers=', followers)

        this.user = {
          ...this.currentUser,
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
    async fetchUserTweetsRepliesLikes() {
      try {
        console.log('this.user.id=', this.user.id)
        const tweets = await usersAPI.getUserTweets({ userId: this.user.id })
        this.tweets = tweets.data
        // console.log('tweets=', this.tweets)

        const replies = await usersAPI.getUserReplies({ userId: this.user.id })
        this.replies = replies.data
        // console.log('replies=', this.replies)

        const likes = await usersAPI.getUserLikes({ userId: this.user.id })
        this.likes = likes.data
        // console.log('likes=', this.likes)

      } catch (error) {
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得 Tweets 資料",
        });
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
};
</script>
