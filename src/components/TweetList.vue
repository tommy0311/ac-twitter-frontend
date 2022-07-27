<template>
  <div 
    id="tweet-element-container"
  >
    <img class="user-headshot" src="../assets/User Photo.png" alt="個人頭像" />
    <div class="ml-2">
      <div class="d-flex">
        <a href="#" class="user-name">{{tweet.id}}</a>
        <p class="user-acount-for-post ml-2">
          <span>@</span>pizzahut<span> • </span>
        </p>
        <p class="post-time">3小時</p>
      </div>
      <p class="tweet-content mt-2">
        {{tweet.description}}
      </p>
      <div class="tweet-icon-show-pannel d-flex mt-1">
        <div class="d-flex align-items-center">
          <img src="../assets/reply.png" alt="" class="tweet-icon-show" />
          <span class="reply-number ml-1">13</span>
        </div>
        <div class="d-flex align-items-center ml-8">
          <img src="../assets/like.png" alt="" class="tweet-icon-show" />
          <span class="like-number ml-1">13</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { emptyImageFilter } from './../utils/mixins'
// import usersAPI from './../apis/users'
// import { Toast } from './../utils/helpers'

export default {
  name: 'TweetList',
  // mixins: [emptyImageFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tweet: this.initialTweet,
      isProcessing: false
    }
  },
  // methods: {
  //   async addFavorite (restaurantId) {
  //     try {
  //       this.isProcessing = true
  //       const { data } = await usersAPI.addFavorite({ restaurantId })

  //       if (data.status === 'error') {
  //         throw new Error(data.message)
  //       }

  //       this.restaurant = {
  //         ...this.restaurant,
  //         isFavorited: true
  //       }
  //       this.isProcessing = false
  //     } catch (error) {
  //       console.error(error.message)
  //       this.isProcessing = false
  //       Toast.fire({
  //         icon: 'error',
  //         title: '無法將餐廳加入最愛，請稍後再試'
  //       })
  //     }
  //   },
  //   async deleteFavorite (restaurantId) {
  //     try {
  //       this.isProcessing = true
  //       const { data } = await usersAPI.deleteFavorite({ restaurantId })

  //       if (data.status === 'error') {
  //         throw new Error(data.message)
  //       }

  //       this.restaurant = {
  //         ...this.restaurant,
  //         isFavorited: false
  //       }
  //       this.isProcessing = false
  //     } catch (error) {
  //       console.error(error.message)
  //       this.isProcessing = false
  //       Toast.fire({
  //         icon: 'error',
  //         title: '無法將餐廳移除最愛，請稍後再試'
  //       })
  //     }
  //   },
  //   async addLike (restaurantId) {
  //     try {
  //       this.isProcessing = true
  //       const { data } = await usersAPI.addLike({ restaurantId })

  //       if (data.status === 'error') {
  //         throw new Error(data.message)
  //       }

  //       this.restaurant = {
  //         ...this.restaurant,
  //         isLiked: true
  //       }
  //       this.isProcessing = false
  //     } catch (error) {
  //       console.error(error.message)
  //       this.isProcessing = false
  //       Toast.fire({
  //         icon: 'error',
  //         title: '無法對餐廳按讚，請稍後再試'
  //       })
  //     }
  //   },
  //   async deleteLike (restaurantId) {
  //     try {
  //       this.isProcessing = true
  //       const { data } = await usersAPI.deleteLike({ restaurantId })

  //       if (data.status === 'error') {
  //         throw new Error(data.message)
  //       }

  //       this.restaurant = {
  //         ...this.restaurant,
  //         isLiked: false
  //       }
  //       this.isProcessing = false
  //     } catch (error) {
  //       console.error(error.message)
  //       this.isProcessing = false
  //       Toast.fire({
  //         icon: 'error',
  //         title: '無法對取消讚，請稍後再試'
  //       })
  //     }
  //   }
  // }
}
</script>