<template>
  <div
    id="admin-user-Profile-card"
    class="flex-column"
  >
    <img
      class="profile-background-img"
      src="../assets/IMG_20190730_054530.jpg"
      alt=""
    >
    <img
      class="profile-headshot"
      src="../assets/Photo2.png"
      alt="個人頭像"
    >
    <div class="profile-info-container text-center">
      <h4 class="user-name mt-8">
        apple
      </h4>
      <p class="user-acount">
        <span>@</span>apple
      </p>
      <!-- <div class="text-canter"></div> -->
      <div class="user-info-icon-pannel d-flex mt-5 justify-content-center">
        <a
          href=""
          class="d-flex align-items-center"
        >
          <img
            src="../assets/quill pen.png"
            alt=""
            class="user-info-icon"
          >
          <span class="post-amount ml-2">1.5k</span>
        </a>
        <a
          href=""
          class="d-flex align-items-center ml-5"
        >
          <img
            src="../assets/like.png"
            alt=""
            class="user-info-icon"
          >
          <span class="like-amount ml-2">20k</span>
        </a>
      </div>
      <div class="d-flex mt-3 text-center mb-6 justify-content-center">
        <a
          href="#"
          class="user-follow-info"
        >
          <span class="following-number">34</span><span class="ml-1">個</span>跟隨中
        </a>
        <a
          href="#"
          class="user-follow-info"
        >
          <span class="follower-number ml-2">34</span><span class="ml-1">位</span>跟隨者
        </a>
      </div>
    </div>
  </div>
</template>
