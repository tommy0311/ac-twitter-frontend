import Vue from "vue";
import VueRouter from "vue-router";
import LoginForm from "../views/LoginForm.vue";
import MainPage from "../views/MainPage.vue";
import NotFound from "../views/NotFound.vue";
import store from './../store'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/login",
  },
  {
    path: "/regist",
    name: "regist",
    component: () => import("../views/RegistForm.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/main",
    name: "main",
    component: MainPage,
  },
  {
    path: "/replylist",
    name: "replylist",
    component: () => import("../views/ReplyList.vue"),
  },
  // {
  //   path: "/user/:id",
  //   name: "user",
  //   component: () => import("../views/UserPage.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "user-tweets",
  //       component: () => import("../components/UserTweets.vue"),
  //     },
  //     {
  //       path: "replies",
  //       name: "user-replies",
  //       component: () => import("../components/UserReplies.vue"),
  //     },
  //     {
  //       path: "likes",
  //       name: "user-likes",
  //       component: () => import("../components/UserLikes.vue"),
  //     },
  //     {
  //       path: "profile/edit",
  //       name: "user-profile-edit",
  //       component: () => import("../components/ProfileEdit.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/user/:id/followers",
  //   name: "followers",
  //   component: () => import("../views/UserFollowers.vue"),
  // },
  // {
  //   path: "/users/:id/followings",
  //   name: "followings",
  //   component: () => import("../views/UserFollowings.vue"),
  // },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/AdminLogIn.vue"),
  },
  {
    path: "/admin/main",
    name: "admin-main",
    component: () => import("../views/AdminMain.vue"),
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: () => import("../views/AdminUsers.vue"),
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => { // 每一次使用者點擊不同頁面的路由，都需要檢查使用者 token 是否過期

  // 從 localStorage 取出 token
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.token

  let isAuthenticated = store.state.isAuthenticated
  
  // 有 token 的情況下，才向後端驗證
  if (token && token !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathsWithoutAuthentication = ['login', 'regist']

  // 如果 token 無效，並且想前往登入和註冊之外的頁面，則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/login')
    return
  }

  // 如果 token 有效，並且想前往登入或註冊頁，則轉址到 MainPage.vue
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/main')
    return
  }

  next()
})

export default router;
