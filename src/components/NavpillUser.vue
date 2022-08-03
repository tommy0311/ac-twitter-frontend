<template>
  <div
    id="navpillUser-container"
    class="d-flex"
  >
    <div class="navpill-title-container">
      <router-link
        v-if="isCurrentUser"
        :to="{
          name: 'user-tweets' // 導引至 UserSelf.vue
        }"
        class="navpill-title"
      >
        推文
      </router-link>
      <router-link
        v-else
        :to="{
          name: 'user-id-tweets', // 導引至 UserOther.vue
          params: { userId: user.id }
        }"
        class="navpill-title"
      >
        推文
      </router-link>
    </div>
    <div class="navpill-title-container">
      <router-link
        v-if="isCurrentUser"
        :to="{
          name: 'user-replied_tweets' // 導引至 UserSelf.vue
        }"
        class="navpill-title"
      >
        回覆
      </router-link>
      <router-link
        v-else
        :to="{
          name: 'user-id-replied_tweets', // 導引至 UserOther.vue
          params: { userId: user.id }
        }"
        class="navpill-title"
      >
        回覆
      </router-link>
    </div>
    <div class="navpill-title-container">
      <router-link
        v-if="isCurrentUser"
        :to="{
          name: 'user-likes' // 導引至 UserSelf.vue
        }"
        class="navpill-title"
      >
        喜歡的內容
      </router-link>
      <router-link
        v-else
        :to="{
          name: 'user-id-likes', // 導引至 UserOther.vue
          params: { userId: user.id }
        }"
        class="navpill-title"
      >
        喜歡的內容
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

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
    },
    initialIsCurrentUser: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      user: {
        ...this.initialUser
      },
      isCurrentUser: this.initialIsCurrentUser,
      isLoading: true
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch: {
    initialUser (newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
      this.user = newValue
    }
  },
}
</script>