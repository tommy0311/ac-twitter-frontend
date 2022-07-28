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
        <template>
          <button class="profile-btn mr-4" type="submit">
            <img src="../assets/btn_messege.png" alt="寄送訊息" />
          </button>
          <button class="profile-btn" type="submit">
            <img src="../assets/btn_noti.png" alt="訂閱按鈕" />
          </button>
          <button class="profile-btn" type="submit">
            <img src="../assets/btn_noti_or.png" alt="退訂閱按鈕" /></button
        ></template>
        <button class="edit-profile-btn empty-btn-style ml-4" type="submit">
          編輯個人資料
        </button>
      </div>
      <h4 class="user-name mt-4">apple</h4>
      <p class="user-acount"><span>@</span>apple</p>
      <p class="user-describe mt-2">
        please describe, briefly describe, words to describe
      </p>
      <div class="user-follow-info d-flex mt-2">
        <router-link to="/user/following">
          <span class="following-number">34</span
          ><span class="ml-1">個</span>跟隨中
        </router-link>
        <router-link to="/user/follower">
          <span class="follower-number ml-5">34</span
          ><span class="ml-1">個</span>跟隨者
        </router-link>
      </div>
    </div>
  </div>
</template>
