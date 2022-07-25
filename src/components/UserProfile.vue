<template>
  <div id="userProfile-container" class="flex-column">
    <img
      class="profile-background-img"
      src="../assets/IMG_20190730_054530.jpg"
      alt=""
    />
    <img class="profile-headshot" src="../assets/Photo2.png" alt="個人頭像" />
    <div class="profile-info-container">
      <div class="d-flex justify-content-end">
        <button class="edit-profile-btn empty-btn-style" type="submit">
          編輯個人資料
        </button>
      </div>
      <h4 class="user-name mt-4">apple</h4>
      <p class="user-acount"><span>@</span>apple</p>
      <p class="user-describe mt-2">
        please describe, briefly describe, words to describe
      </p>
      <div class="user-follow-info d-flex mt-2">
        <a href="#">
          <span class="following-number">34</span
          ><span class="ml-1">個</span>跟隨中
        </a>
        <a href="#">
          <span class="follower-number ml-5">34</span
          ><span class="ml-1">個</span>跟隨者
        </a>
      </div>
    </div>
  </div>
</template>
