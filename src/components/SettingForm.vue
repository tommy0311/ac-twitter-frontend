<template>
  <div
    id="setting-form-container"
    class="flex-column"
  >
    <form
      class="form-container"
      action=""
    >
      <div class="form-element-group">
        <label for="user-account">帳號</label>
        <input
          id="user-account"
          type="text"
          class="user-account"
          placeholder="請輸入帳號"
          required
        >
      </div>
      <div class="form-element-group">
        <label for="user-name">名稱</label>
        <input
          id="user-name"
          type="password"
          class="user-name"
          placeholder="請輸入使用者名稱"
          required
        >
      </div>
      <div class="form-element-group">
        <label for="user-name">Email</label>
        <input
          id="user-email"
          type="email"
          class="user-email"
          placeholder="請輸入Email"
          required
        >
      </div>
      <div class="form-element-group">
        <label for="user-password">密碼</label>
        <input
          id="user-password"
          type="password"
          class="user-password"
          placeholder="請輸入密碼"
          required
        >
      </div>
      <div class="form-element-group">
        <label for="user-password-confirm">密碼再確認</label>
        <input
          id="user-password-confirm"
          type="password"
          class="user-password-confirm"
          placeholder="請再次輸入密碼"
          required
        >
      </div>
      <div class="d-flex justify-content-end">
        <button
          class="login-btn main-btn-style"
          type="submit"
        >
          儲存
        </button>
      </div>
    </form>
  </div>
</template>
