<template>
  <div>
    <div
      v-for="recommendUser in recommendUsers"
      :key="recommendUser.id"
      class="recommendAccount-panel"
    >
      <div class="recommendAccount-element d-flex align-items-center">
        <img
          class="user-headshot"
          :src="recommendUser.avatar | emptyImage"
          alt="個人頭像"
        >

        <div>
          <router-link
            :to="{
              name: 'user-id-tweets',
              params: { userId: recommendUser.id }
            }"
            class="user-name"
          >
            {{ recommendUser.name }}
          </router-link>
          <h4 class="user-acount">
            <span>@</span>{{ recommendUser.account }}
          </h4>
        </div>

        <button
          v-if="recommendUser.isFollowed"
          class="follow-btn empty-btn-style"
          type="submit"
          @click.stop.prevent="removeFollowing(recommendUser.id)"
        >
          正在跟隨
        </button>

        <button
          v-else
          class="follow-btn empty-btn-style"
          type="submit"
          @click.stop.prevent="addFollowing(recommendUser.id)"
        >
          跟隨
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "./../utils/helpers"
import usersAPI from "./../apis/users"
import { mapState } from "vuex"
import { emptyImageFilter } from './../utils/mixins'

export default {
  name: "RecommendColumnFollow",
  mixins: [emptyImageFilter],
  props: {
    initialRecommendUsers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      recommendUsers: this.initialRecommendUsers,
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch: {
    initialRecommendUsers (newValue) {
      this.recommendUsers = {
        ...this.recommendUsers,
        ...newValue
      }
      this.recommendUsers = newValue
    }
  },
  methods: {
    async addFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFollowing({ userId });
        console.log("following users=", data);

        const obj = JSON.parse(JSON.stringify(this.recommendUsers))
        const arr = Object.values(obj)
        for(const user of arr ) {
          if(user.id === userId) {
            user.isFollowed = true
            break
          }
        }
        this.recommendUsers = arr
        this.$emit('fromRCF')

        this.isProcessing = false;
      } catch (error) {
        console.error(error.message);
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "目前無法跟隨使用者，請稍後再試",
        });
      }
    },
    async removeFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.removeFollowing({ userId });
        console.log("following users=", data);

        const obj = JSON.parse(JSON.stringify(this.recommendUsers))
        const arr = Object.values(obj)
        for(const user of arr ) {
          if(user.id === userId) {
            user.isFollowed = false
            break
          }
        }
        this.recommendUsers = arr
        this.$emit('fromRCF')

        this.isProcessing = false;
      } catch (error) {
        console.error(error.message);
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "目前無法取消跟隨使用者，請稍後再試",
        });
      }
    },
  },
};
</script>
