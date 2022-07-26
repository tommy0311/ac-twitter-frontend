import Vue from "vue";
import VueRouter from "vue-router";
import LoginForm from "../views/LoginForm.vue";
import MainPage from "../views/MainPage.vue";
import NotFound from "../views/NotFound.vue";

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

export default router;
