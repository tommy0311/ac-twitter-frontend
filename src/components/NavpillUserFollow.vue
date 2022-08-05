<template>
  <div
    id="navpillUser-container"
    class="d-flex"
  >
    <div class="navpill-title-container">
      <router-link
        v-if="isCurrentUser"
        :to="{
          name: 'user-followerlist' // 導引至自己          
        }"
        class="navpill-title"
        :class="isFollowerActive"
      >
        追隨者
      </router-link>
      <router-link
        v-else
        :to="{
          name: 'user-id-followerlist', // 導引至別人
          params: { userId: user.id }
        }"
        class="navpill-title"
        :class="isFollowerActive"
      >
        追隨者
      </router-link>
    </div>

    <div class="navpill-title-container">
      <router-link
        v-if="isCurrentUser"
        :to="{
          name: 'user-followinglist' // 導引至自己
        }"
        class="navpill-title"
        :class="isFollowingActive"
      >
        正在追隨
      </router-link>
      <router-link
        v-else
        :to="{
          name: 'user-id-followinglist', // 導引至別人
          params: { userId: user.id }
        }"
        class="navpill-title"
        :class="isFollowingActive"
      >
        正在追隨
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "NavpillUserFollow",
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
    },
    initialFollowerActive: {
      type: String,
      default: ''
    },
    initialFollowingActive: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      user: {
        ...this.initialUser
      },
      isCurrentUser: this.initialIsCurrentUser,
      isFollowerActive: this.initialFollowerActive,
      isFollowingActive: this.initialFollowingActive, 
      routeName: '',
      isLoading: true,     
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
    },
    initialFollowerActive (newValue) {
      this.isFollowerActive = newValue
    },
    initialFollowingActive (newValue) {
      this.isFollowingActive = newValue
    },
  },
}
</script>