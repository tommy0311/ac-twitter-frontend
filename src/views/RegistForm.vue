<template>
   <div id="regist-container">
      <img class="logo-img" src="../assets/logo@2.png" alt="" />
      <h1>建立你的帳號</h1>
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
          <label for="user-name">名稱</label>
          <input
            type="password"
            id="user-name"
            class="user-name"
            placeholder="請輸入使用者名稱"
            required
          />
        </div>
        <div class="form-element-group">
          <label for="user-name">Email</label>
          <input
            type="email"
            id="user-email"
            class="user-email"
            placeholder="請輸入Email"
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
        <div class="form-element-group">
          <label for="user-password-confirm">密碼確認</label>
          <input
            type="password"
            id="user-password-confirm"
            class="user-password-confirm"
            placeholder="請再次輸入密碼"
            required
          />
        </div>
        <button class="login-btn main-btn-style" type="submit">註冊</button>
        <a class="submit-other-choice text-center" href="">取消</a>
      </form>
    </div>
</template>
