<template>
  <div id="login-container">
    <img class="logo-img" src="../assets/logo@2.png" alt="" />
    <h1>登入Alphitter</h1>
    <form class="form-container" action="">
      <div class="form-element-group">
        <label for="user-account">帳號</label>
        <input
          type="text"
          id="user-account"
          class="user-account"
          placeholder="請輸入帳號"
          required
        />
      </div>
      <div class="form-element-group">
        <label for="user-password">密碼</label>
        <input
          type="password"
          id="user-password"
          class="user-password"
          placeholder="請輸入密碼"
          required
        />
      </div>
      <button class="login-btn main-btn-style" type="submit">登入</button>
      <div class="d-flex admin-text-link-container text-right">
        <router-link to="/regist" class="submit-other-choice">
          註冊
        </router-link>
        <span> · </span>
        <a class="submit-other-choice" href="">abc後台登入</a>
      </div>
    </form>
  </div>
</template>
