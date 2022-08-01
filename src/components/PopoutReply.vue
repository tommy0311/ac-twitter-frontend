<template>
  <div class="popup-background">
    <div id="popup-writtingTweet-container">
      <div class="headerbox align-items-center">
        <a href="">
          <img
            class="popup-cancel-icon"
            src="../assets/X.png"
            alt="取消推文視窗按鈕"
          >
        </a>
      </div>
      <div class="want-reply-post-container">
        <img
          class="user-headshot"
          src="../assets/User Photo.png"
          alt="個人頭像"
        >
        <div class="ml-2">
          <div class="d-flex align-items-center">
            <a 
              href="#"
              class="user-name"
            >
              Pizza Hut
            </a>
            <p class="user-acount-for-post ml-2">
              <span>@</span>pizzahut<span> • </span>
            </p>
            <p class="post-time">
              3小時
            </p>
          </div>
          <p class="tweet-content mt-2">
            By default, flex items will all try to fit onto one line. You can
            change that and allow the items to wrap as needed with this property
          </p>
          <div class="reply-to-who-container d-flex mt-3">
            回覆給
            <span class="reply-to-who-acount ml-1">
              <span>@</span>
              apple
            </span>
          </div>
        </div>
      </div>

      <div class="writtingTweet-pannel d-flex">
        <img
          class="user-headshot"
          src="../assets/Photo2.png"
          alt="個人頭像"
        >
        <input
          id="user-writting-post"
          type="text"
          class="user-writting-post"
          placeholder="有什麼新鮮事"
          required
        >
        <div class="d-flex justify-content-end align-items-end">
          <button
            class="post-btn second-btn-style"
            type="submit"
          >
            推文
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
