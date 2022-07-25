<template>
  <div id="reply-post-container">
    <div class="d-flex">
      <img
        class="user-headshot"
        src="../assets/User Photo.png"
        alt="個人頭像"
      />
      <div class="flex-column ml-2">
        <a href="#" class="user-name">apple</a>
        <p class="user-acount-for-post"><span>@</span>apple</p>
      </div>
    </div>
    <p class="tweet-content mt-2">
      By default, flex items will all try to fit onto one line. You can change
      that and allow the items to wrap as needed with this property
    </p>
    <div class="tweet-post-time-pannel d-flex mt-2">
      <p class="post-time">10:05</p>
      <span> · </span>
      <p class="post-date">2021年10月8日</p>
    </div>
    <div class="reply-like-number-container d-flex mt-2">
      <p><span class="tweet-reply-number">34</span> 回覆</p>
      <p class="ml-6"><span class="tweet-like-number">808</span>喜歡次數</p>
    </div>
    <div class="tweet-icon-show-pannel d-flex mt-1">
      <a href="#"
        ><img src="../assets/reply.png" alt="回覆按鈕" class="tweet-icon-show"
      /></a>
      <a href="#"
        ><img
          src="../assets/like.png"
          alt="愛心按鈕"
          class="tweet-icon-show like-icon"
      /></a>
    </div>
  </div>
</template>
