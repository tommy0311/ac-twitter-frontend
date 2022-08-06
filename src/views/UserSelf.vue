<template>
  <div class="d-flex justify-content-center">
    <NavBar
      :initial-profile="isProfile"
    />
    <div class="main-wrapper">
      <NavpillHeader />           

      <div class="container-for-scroll scrollbar">
        <UserProfile
          :initial-user="user"
        /> 
        <!-- 包含 推文、回覆、喜歡的內容 三個分頁 -->
        <NavpillUser
          :initial-user="user"
          :initial-is-current-user="isCurrentUser"
          :initial-tweets-active="isTweetsActive"
          :initial-replies-active="isRepliesActive"
          :initial-likes-active="isLikesActive"
        />
        <router-view
          :initial-tweets="tweets"
          :initial-replies="replies"
          :initial-likes="likes"
          @updateLikes="fetchUserTweetsRepliesLikes"
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
import UserProfile from "../components/UserProfile.vue"
import NavpillUser from "../components/NavpillUser.vue"
import { mapState } from "vuex"
import { Toast } from './../utils/helpers'
import usersAPI from "./../apis/users"
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  name: "UserSelf",
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeader,
    UserProfile,
    NavpillUser,
    LoadingSpinner
  },
  beforeRouteUpdate(to, from, next) {
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
      tweets: [],
      replies: [],
      likes: [],
      currentUserLikes: [],
      recommendUsers: [],
      isCurrentUser: false,
      isTweetsActive: '',
      isRepliesActive: '',
      isLikesActive: '',
      isProfile: true,
      isProcessing: false,
      isRecommendUsersLoading: true,
    }
  },
  computed: {
    ...mapState(["currentUser"])
  },
  watch: {
    user: "fetchUserTweetsRepliesLikes"
  },
  created () {
    this.fetchFollowingsFollowers(this.currentUser.id);
    this.fetchRecommendUsers();
    this.isCurrentUser = true;
    this.updateRouteName( this.$route.name )
  },
  methods: {
    updateRouteName(name) {      
      this.isTweetsActive = name === 'user-tweets' ? 'navpill-title-active' : ''
      this.isRepliesActive = name === 'user-replied_tweets' ? 'navpill-title-active' : ''
      this.isLikesActive = name === 'user-likes' ? 'navpill-title-active' : ''
    },
    updatePage() {
      this.fetchFollowingsFollowers(this.currentUser.id);
      this.fetchRecommendUsers();
      this.fetchUserTweetsRepliesLikes();
    },
    async fetchFollowingsFollowers (userId) {
      try {
        const followingsData = await usersAPI.getUserFollowings({ userId })
        const followings = followingsData.data

        const followersData = await usersAPI.getUserFollowers({ userId })
        const followers = followersData.data

        this.user = { // initialize this.user
          ...this.currentUser,
          followingCount: followings.length,
          followerCount: followers.length
        }

      } catch (error) {
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取得 follow 資料，請稍後再試'
        })
      }
    },
    async fetchUserTweetsRepliesLikes() {
      try {
        const currentUserLikes = await usersAPI.getUserLikes({userId: this.currentUser.id});
        this.currentUserLikes = currentUserLikes.data

        const tweets = await usersAPI.getUserTweets({ userId: this.user.id })
        this.tweets = tweets.data.map( tweet => {
          tweet.isCurrentUser = tweet.UserId === this.currentUser.id ? true : false
          if( this.currentUserLikes.some(l => l.TweetId === tweet.id) ) {
            return {
              ...tweet,
              isLiked: true
            }
          } else {
            return {
              ...tweet,
              isLiked: false
            }
          }
        })

        const replies = await usersAPI.getUserReplies({ userId: this.user.id })
        this.replies = replies.data.map( reply => {
          reply.isCurrentUser = reply.UserId === this.currentUser.id ? true : false
          return {
            ...reply
          }
        })

        this.likes = this.currentUserLikes.map( like => {
          return {
            ...like,
            isLiked: true
          }
        })

      } catch (error) {
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得 Tweets Replies Likes 資料",
        });
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
};
</script>
