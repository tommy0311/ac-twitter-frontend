## 介紹
仿造 Twitter 產品內容及功能，所做的簡化專案。 採前後端分離開發。
### 功能

註冊/登入/登出：

- 使用者可以註冊自己的專屬帳號
- 使用者必須登入後才能使用此網站
- 使用者註冊必須符合註冊規範

使用者：

- 使用者可以新增/瀏覽/回覆推文，但必須符合系統規範
- 使用者可以瀏覽單一貼文的所有回覆
- 使用者可以點選按鈕對貼文表示Like/Unlike
- 使用者可以編輯自己的帳號、名稱、大頭照及封面照
- 使用者可以查看他人的基本資料
- 使用者可以追蹤/取消追蹤其他使用者
- 使用者能在首頁的側邊欄，看見跟隨者 (followers) 數量排列前 10 的推薦跟隨名單
- 使用者可以更新密碼
- 使用者帳號不可以登入管理者後台

管理者：

- 管理者可以在後台瀏覽所有貼文及刪除單一貼文
- 管理者可已在後台瀏覽所有使用者清單
- 管理者帳號不可以登入使用者前台


## 測試帳號
前台帳號：
account: user1
email: user1@example.com
password: 12345678

後台帳號：
account: root
email: root@example.com
password: 12345678



## 開發工具
● vue2 + vuex + vue-router + axios + scss + sweetalert2



## Getting Started
- 複製本專案
git clone https://github.com/eddie8119/ac-twitter-frontend.git

- 進到專案資料夾
cd ac-twitter-frontend

- 安裝所需要的套件
npm install

- 在本地啟動專案
npm run serve   

- 打包專案用於佈署
npm run build

