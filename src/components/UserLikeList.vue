<template>
  <div id="user-like-list-container">
    <img class="user-headshot" src="../assets/User Photo.png" alt="個人頭像" />
    <div class="ml-2">
      <div class="d-flex align-items-center">
        <a href="#" class="user-name">Pizza Hut</a>
        <p class="user-acount-for-post ml-2">
          <span>@</span>pizzahut<span> • </span>
        </p>
        <p class="post-time">3小時</p>
      </div>
      <p class="tweet-content mt-2">
        By default, flex items will all try to fit onto one line. You can change
        that and allow the items to wrap as needed with this property
      </p>
      <div class="tweet-icon-show-pannel d-flex mt-1">
        <div class="d-flex align-items-center">
          <button>
            <img src="../assets/reply.png" alt="" class="tweet-icon-show" />
          </button>
          <span class="reply-number ml-1">13</span>
        </div>
        <div class="d-flex align-items-center ml-8">
          <button>
            <img src="../assets/like.png" alt="" class="tweet-icon-show" />
          </button>
          <span class="like-number ml-1">13</span>
        </div>
      </div>
    </div>
  </div>
</template>
