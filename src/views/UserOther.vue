<template>
  <div class="d-flex justify-content-center">
    <NavBar />
    <div class="main-wrapper">
      <NavpillHeader />
      <UserProfileOther
        :initial-user="user"
        @fromUserProfileOther="updatePage"
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
          @fromUserLikeList="updatePage"
        />
      </div>
    </div>

    <div id="recommendColumn-container">
      <div class="recommendHeader mt-4">
        <h1>推薦跟隨</h1>
      </div>
      <RecommendColumn
        :initial-recommend-users="recommendUsers"
        @fromRCF="updatePage"
      />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue"
import RecommendColumn from "../components/RecommendColumn.vue"
import NavpillHeader from "../components/NavpillHeader.vue"
import UserProfileOther from "../components/UserProfileOther.vue"
import NavpillUser from "../components/NavpillUser.vue"
import { Toast } from './../utils/helpers'
import usersAPI from "./../apis/users"
import { mapState } from "vuex"

export default {
  name: "UserOther",
  components: {
    NavBar,
    RecommendColumn,
    NavpillHeader,
    UserProfileOther,
    NavpillUser,
  },
  beforeRouteUpdate (to, from, next) {
    const { userId } = to.params
    this.fetchUser(userId)
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
        followerCount: -1,
        isFollowed: false
      },
      tweets: [],
      replies: [],
      likes: [],
      currentUserLikes: [],
      currentUserFollowings: [],
      recommendUsers: [],
      userId: -1,
      isProcessing: false
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch: {
    user: "fetchUserTweetsRepliesLikes"
  },
  created () {
    const { userId } = this.$route.params
    this.userId = Number(userId)
    this.fetchUser(this.userId);
    this.fetchfollowingCount(this.userId);
    this.fetchCurrentUserFollowings();
    this.fetchRecommendUsers();
  },
  methods: {
    updatePage() {
      this.fetchfollowingCount(this.userId);
      this.fetchRecommendUsers();
      this.fetchUserTweetsRepliesLikes();
      this.fetchCurrentUserFollowings();
    },
    // 判斷按鈕呈現為 正在跟隨？ 跟隨？
    async fetchCurrentUserFollowings() {
      try {
        const followingsData = await usersAPI.getUserFollowings({ userId: this.currentUser.id })
        const followings = followingsData.data
        console.log('cur followings=', followings)
        this.user.isFollowed = followings.some( f => f.followingId === this.userId) ? true : false
      } catch (error) {
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取得 CurrentUserFollowings 資料，請稍後再試'
        })
      }
    },
    // 更新 跟隨中、跟隨者 的數字
    async fetchfollowingCount (userId) {
      try {
        const followingsData = await usersAPI.getUserFollowings({ userId })
        const followings = followingsData.data

        const followersData = await usersAPI.getUserFollowers({ userId })
        const followers = followersData.data
        // console.log('followings=', followings)
        // console.log('followers=', followers)
        this.user.followingCount = followings.length,
        this.user.followerCount = followers.length

      } catch (error) {
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取得 followingCount，請稍後再試'
        })
      }
    },
    // 取得 使用者基本資料
    async fetchUser (userId) {
      try {
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
          role
        }
      } catch (error) {
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取得 User 資料，請稍後再試'
        })
      }
    },
    // 取得 推文 回覆 喜歡的內容
    async fetchUserTweetsRepliesLikes() {
      try {
        console.log('this.user.id=', this.user.id)

        const currentUserLikes = await usersAPI.getUserLikes({userId: this.currentUser.id});
        this.currentUserLikes = currentUserLikes.data

        const tweets = await usersAPI.getUserTweets({ userId: this.user.id })
        this.tweets = tweets.data
        // console.log('tweets=', this.tweets)
        this.tweets = this.tweets.map( tweet => {
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
        this.replies = replies.data
        // console.log('replies=', this.replies)

        const likes = await usersAPI.getUserLikes({ userId: this.user.id })
        this.likes = likes.data.map( like => {
          if( this.currentUserLikes.some(l => l.TweetId === like.TweetId) ) {
            return {
              ...like,
              isLiked: true
            }
          } else {
            return {
              ...like,
              isLiked: false
            }
          }
        })
        console.log('likes=', this.likes)

      } catch (error) {
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得 Tweets 資料",
        });
      }
    },
    // 更新 右邊的推薦跟隨
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
