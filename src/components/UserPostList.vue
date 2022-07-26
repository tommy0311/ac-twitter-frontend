<template>
  <div class="y-scroll">
    <div id="user-post-list-container">
      <img
        class="user-headshot"
        src="../assets/User Photo.png"
        alt="個人頭像"
      />
      <div class="ml-2">
        <div class="d-flex align-items-center">
          <a href="#" class="user-name">apple</a>
          <p class="user-acount-for-post ml-2">
            <span>@</span>apple<span> • </span>
          </p>
          <p class="post-time">3小時</p>
        </div>
        <p class="tweet-content mt-2">
          By default, flex items will all try to fit onto one line. You can
          change that and allow the items to wrap as needed with this property
        </p>
        <div class="tweet-icon-show-pannel d-flex mt-1">
          <a href="" class="d-flex align-items-center">
            <img src="../assets/reply.png" alt="" class="tweet-icon-show" />
            <span class="reply-number ml-1">13</span>
          </a>
          <a href="" class="d-flex align-items-center ml-8">
            <img src="../assets/like.png" alt="" class="tweet-icon-show" />
            <span class="like-number ml-1">13</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
