<template>
  <div class="wrapper">
    <div
      class="popup-background"      
    />
    <div id="popup-profile-editing-container">
      <div class="headerbox d-flex">
        <router-link to="/user">
          <button>
            <img
              class="popup-cancel-icon"
              src="../assets/X.png"
              alt="取消推文視窗按鈕"
            >
          </button>
        </router-link>               
          
        <p>編輯個人資料</p>
        <div class="justify-content-end">
          <button
            class="save-btn second-btn-style"
            type="submit"
          >
            儲存
          </button>
        </div>
      </div>
      <div class="userProfile-editing-container flex-column">
        <div class="img-cover-for-profile-background-img">
          <img
            class="profile-background-img"
            src="../assets/IMG_20190730_054530.jpg"
            alt=""
          >
          <div class="icon-editing-background-img-pannel">
            <button>
              <img
                src="../assets/icon_uploadPhoto.png"
                alt="上傳照片按鈕"
                class="icon-for-background-add"
              >
            </button>
            <button>
              <img
                src="../assets/icon_delete.png"
                alt="刪除上傳照片按鈕"
                class="icon-for-background-delete"
              >
            </button>
          </div>
        </div>
        <div class="img-cover-for-profile-headshot-img" />
        <img
          class="profile-headshot"
          src="../assets/Photo2.png"
          alt="個人頭像"
        >
        <button>
          <img
            src="../assets/icon_uploadPhoto.png"
            alt="上傳照片按鈕"
            class="icon-for-headshot-add"
          >
        </button>
        <div class="editing-form-pannel">
          <form
            class="form-container"
            action=""
          >
            <div class="form-element-group">
              <label for="user-account">名稱</label>
              <input
                id="user-account"
                v-model="account"
                type="text"
                class="user-account"
                placeholder="his name"
                required
              >
              <div class="d-flex justify-content-end">
                <span class="editing-world-limit mt-1">8/50</span>
              </div>
            </div>
            <div class="form-element-group">
              <label for="user-introduction">自我介紹</label>
              <input
                id="user-introduction"
                v-model="introduction"
                type="text"
                class="user-introduction"
                placeholder="his name"
                required
              >
              <div class="d-flex justify-content-end">
                <span class="editing-world-limit mt-1">0/160</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
 
  data() {
    return {
            
    }
  },
  created() {
    
  },
  methods: {
    async handleSubmit() {     
    },
  },
}
</script>