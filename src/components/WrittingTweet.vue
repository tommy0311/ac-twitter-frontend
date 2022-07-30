<template>
  <div id="writtingTweet-container">
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
  <!-- <div class="user-post-under-line"></div> -->
</template>
