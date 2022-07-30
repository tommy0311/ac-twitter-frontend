<template>
  <div
    id="navpillUser-container"
    class="d-flex"
  >
    <template>
      <div class="navpill-title-container">
        <router-link
          :to="{
            name: 'user-id-tweets',
            params: { userId: user.id }
          }"
          class="navpill-title"
        >
          推文
        </router-link>
      </div>
      <div class="navpill-title-container">
        <router-link
          :to="{
            name: 'user-id-replied_tweets',
            params: { userId: user.id }
          }"
          class="navpill-title"
        >
          回覆
        </router-link>
      </div>
      <div class="navpill-title-container">
        <router-link
          :to="{
            name: 'user-id-likes',
            params: { userId: user.id }
          }"
          class="navpill-title"
        >
          喜歡的內容
        </router-link>
      </div>
    </template>

    <div class="navpill-title-container">
      <router-link
        to="/user/follower"
        class="navpill-title"
      >
        追隨者
      </router-link>
    </div>
    <div class="navpill-title-container">
      <router-link
        to="/user/following"
        class="navpill-title"
      >
        正在追隨者
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavpillUser",
  props: {
    initialUser: {
      type: Object,
      default: () => {
        return {
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
        }
      }
    }
  },
  data () {
    return {
      user: {
        ...this.initialUser
      },
      isLoading: true
    }
  },
  watch: {
    initialUser (newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
    }
  }
}
</script>