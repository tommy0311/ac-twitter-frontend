<template>
  <div id="admin-login-container">
      <img class="logo-img" src="../assets/logo@2.png" alt="" />
      <h1>後台登入</h1>
      <form class="form-container" action="">
        <div class="form-element-group">
          <label for="admin-account">帳號</label>
          <input
            type="text"
            id="admin-account"
            class="admin-account"
            placeholder="請輸入帳號"
            required
          />
        </div>
        <div class="form-element-group">
          <label for="admin-password">密碼</label>
          <input
            type="password"
            id="admin-password"
            class="admin-password"
            placeholder="請輸入密碼"
            required
          />
        </div>
        <button class="login-btn main-btn-style" type="submit">登入</button>
        <a class="submit-other-choice text-right" href="">前台登入</a>
      </form>
    </div>
</template>
