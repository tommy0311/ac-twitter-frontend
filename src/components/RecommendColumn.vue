<template>
  <div class="recommendAccount-panel">
    <div class="recommendAccount-element d-flex align-items-center">
      <img
        class="user-headshot"
        src="../assets/User Photo.png"
        alt="個人頭像"
      />

      <div>
        <a href="#" class="user-name">{{recommendUser.name}}</a>
        <h4 class="user-acount"><span>@</span>{{recommendUser.account}}</h4>
      </div>

      <button
        v-if="recommendUser.isFollowed"
        class="follow-btn empty-btn-style"
        type="submit"
      >
        正在跟隨
      </button>

      <button
        v-else
        class="follow-btn empty-btn-style"
        type="submit"
      >
        跟隨
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendColumn',
  props: {
    initialRecommenduser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      recommendUser: this.initialRecommenduser,
      isProcessing: false
    }
  },
}
</script>