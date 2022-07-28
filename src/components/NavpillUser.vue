<template>
  <div id="navpillUser-container" class="d-flex">
    <template>
      <div class="navpill-title-container">
        <router-link to="/user" class="navpill-title">推文</router-link>
      </div>
      <div class="navpill-title-container">
        <router-link to="/user/reply" class="navpill-title">回覆</router-link>
      </div>
      <div class="navpill-title-container">
        <router-link to="/user/like" class="navpill-title"
          >喜歡的內容</router-link
        >
      </div>
    </template>
    <div class="navpill-title-container">
      <router-link to="/user/follower" class="navpill-title"
        >追隨者</router-link
      >
    </div>
    <div class="navpill-title-container">
      <router-link to="/user/following" class="navpill-title"
        >正在追隨者</router-link
      >
    </div>
  </div>
</template>
