"use strict";(self["webpackChunkalphitter"]=self["webpackChunkalphitter"]||[]).push([[334],{37438:(e,t,i)=>{i.d(t,{Z:()=>v});i(68309);var r=function(){var e=this,t=e._self._c;return t("div",{staticStyle:{position:"relative"}},[e.replyModalShow?t("PopoutReply"):e._e(),e.writingTweetModalShow?t("PopoutWritingTweet"):e._e(),t("div",{attrs:{id:"navpillHeader-container"}},[e._m(0),t("div",{staticClass:"navpill-info-container flex-column"},[t("router-link",{staticClass:"navpillHeader-title",attrs:{to:{name:"user-tweets"}}},[e._v(" "+e._s(e.currentUser.name)+" ")]),t("p",{staticClass:"post-number-hint"},[e._v(" "+e._s(e.currentUser.tweetsCount)+" "),t("span",[e._v("推文")])])],1)])],1)},s=[function(){var e=this,t=e._self._c;return t("a",{attrs:{href:"javascript:history.back()"}},[t("img",{staticClass:"arrow-icon",attrs:{src:i(57139),alt:"回到上一頁"}})])}],o=i(4648),n=i(63822),l=i(46031),a=i(49827);const c={name:"NavpillHeader",components:{PopoutReply:l["default"],PopoutWritingTweet:a["default"]},data:function(){return{isLoading:!0}},computed:(0,o.Z)({},(0,n.rn)(["currentUser","replyModalShow","writingTweetModalShow"]))},u=c;var d=i(43736),w=(0,d.Z)(u,r,s,!1,null,null,null);const v=w.exports},81654:(e,t,i)=>{i.d(t,{Z:()=>d});var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"d-flex",attrs:{id:"navpillUser-container"}},[t("div",{staticClass:"navpill-title-container"},[e.currentUser.id===e.user.id?t("router-link",{staticClass:"navpill-title",class:e.isFollowerActive,attrs:{to:{name:"user-followerlist"}}},[e._v(" 追隨者 ")]):t("router-link",{staticClass:"navpill-title",class:e.isFollowerActive,attrs:{to:{name:"user-id-followerlist",params:{userId:e.user.id}}}},[e._v(" 追隨者 ")])],1),t("div",{staticClass:"navpill-title-container"},[e.currentUser.id===e.user.id?t("router-link",{staticClass:"navpill-title",class:e.isFollowingActive,attrs:{to:{name:"user-followinglist"}}},[e._v(" 正在追隨 ")]):t("router-link",{staticClass:"navpill-title",class:e.isFollowingActive,attrs:{to:{name:"user-id-followinglist",params:{userId:e.user.id}}}},[e._v(" 正在追隨 ")])],1)])},s=[],o=i(4648),n=i(63822);const l={name:"NavpillUserFollow",props:{initialUser:{type:Object,default:function(){return{id:-1,account:"",email:"",name:"",avatar:"",cover:"",introduction:"",role:"user",followingCount:-1,followerCount:-1}}},initialFollowerActive:{type:String,default:""},initialFollowingActive:{type:String,default:""}},data:function(){return{user:(0,o.Z)({},this.initialUser),isFollowerActive:this.initialFollowerActive,isFollowingActive:this.initialFollowingActive,routeName:"",isLoading:!0}},computed:(0,o.Z)({},(0,n.rn)(["currentUser"])),watch:{initialUser:function(e){this.user=(0,o.Z)((0,o.Z)({},this.user),e),this.user=e},initialFollowerActive:function(e){this.isFollowerActive=e},initialFollowingActive:function(e){this.isFollowingActive=e}}},a=l;var c=i(43736),u=(0,c.Z)(a,r,s,!1,null,null,null);const d=u.exports},80334:(e,t,i)=>{i.r(t),i.d(t,{default:()=>U});var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"d-flex justify-content-center"},[t("NavBar"),t("div",{staticClass:"main-wrapper"},[t("NavpillHeader"),t("NavpillUserFollow",{attrs:{"initial-user":e.user,"initial-follower-active":e.isFollowerActive,"initial-following-active":e.isFollowingActive}}),t("div",{staticClass:"container-for-scroll scrollbar"},[t("router-view",{attrs:{"initial-followers":e.followers,"initial-followings":e.followings},on:{fromFollowingList:e.updatePage,fromFollowerList:e.updatePage}})],1)],1),t("div",{attrs:{id:"recommendColumn-container"}},[e._m(0),e.isRecommendUsersLoading?t("LoadingSpinner"):t("RecommendColumn",{attrs:{"initial-recommend-users":e.recommendUsers},on:{updateRecommendColumn:e.updatePage}})],1)],1)},s=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"recommendHeader"},[t("h1",[e._v("推薦跟隨")])])}],o=i(50124),n=i(48534),l=i(4648),a=(i(68309),i(21249),i(5212),i(41539),i(48164)),c=i(75676),u=i(37438),d=i(81654),w=i(76163),v=i(78390),m=i(63822),f=i(64396);const p={name:"UserFollow",components:{NavBar:a.Z,RecommendColumn:c.Z,NavpillHeader:u.Z,NavpillUserFollow:d.Z,LoadingSpinner:f.Z},beforeRouteUpdate:function(e,t,i){this.fetchFollowingsFollowers(this.currentUser.id),this.fetchRecommendUsers(),this.updateRouteName(e.name),i()},data:function(){return{user:{id:-1,account:"",email:"",name:"",avatar:"",cover:"",introduction:"",role:"user",followingCount:-1,followerCount:-1},followers:[],followings:[],currentUserFollowings:[],recommendUsers:[],isFollowerActive:"",isFollowingActive:"",isProcessing:!1,isRecommendUsersLoading:!0}},computed:(0,l.Z)({},(0,m.rn)(["currentUser"])),created:function(){this.user=this.currentUser,this.fetchFollowingsFollowers(this.currentUser.id),this.fetchRecommendUsers(),this.updateRouteName(this.$route.name)},methods:{updateRouteName:function(e){this.isFollowerActive="user-followerlist"===e?"navpill-title-active":"",this.isFollowingActive="user-followinglist"===e?"navpill-title-active":""},updatePage:function(){this.fetchFollowingsFollowers(this.currentUser.id),this.fetchRecommendUsers()},fetchFollowingsFollowers:function(e){var t=this;return(0,n.Z)((0,o.Z)().mark((function i(){var r,s;return(0,o.Z)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,v.Z.getUserFollowers({userId:e});case 3:return r=i.sent,i.next=6,v.Z.getUserFollowings({userId:t.currentUser.id});case 6:s=i.sent,t.currentUserFollowings=s.data,t.followers=r.data.map((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isFollowed:t.currentUserFollowings.some((function(t){return t.followingId===e.followerId}))})})),t.followings=s.data.map((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isFollowed:!0})})),i.next=16;break;case 12:i.prev=12,i.t0=i["catch"](0),console.error(i.t0.message),w.FN.fire({icon:"error",title:"無法 fetch Follow 資料，請稍後再試"});case 16:case"end":return i.stop()}}),i,null,[[0,12]])})))()},fetchRecommendUsers:function(){var e=this;return(0,n.Z)((0,o.Z)().mark((function t(){var i,r,s,n;return(0,o.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.isRecommendUsersLoading=!0,t.next=4,v.Z.getUserFollowings({userId:e.currentUser.id});case 4:return i=t.sent,r=i.data,s=r,t.next=9,v.Z.getTopUsers();case 9:n=t.sent,e.recommendUsers=n.data.map((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isFollowed:s.some((function(t){return t.followingId===e.id}))})})),e.isRecommendUsersLoading=!1,t.next=19;break;case 14:t.prev=14,t.t0=t["catch"](0),console.error(t.t0),e.isRecommendUsersLoading=!1,w.FN.fire({icon:"error",title:"無法取得 RecommendUsers 資料，請稍後再試"});case 19:case"end":return t.stop()}}),t,null,[[0,14]])})))()}}},A=p;var g=i(43736),h=(0,g.Z)(A,r,s,!1,null,null,null);const U=h.exports},57139:e=>{e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABTSURBVHgBrdLRCQAgCATQo0ncfylHKRTqQwrM88Cojx6UYl6iqlNEvDLBCwBQQyJg5y+kChyEARxhAUc2UC27P9CRlufYQn/s3tAtZqH+sY9QFlmZh9qG/+G4HQAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=334.70672486.js.map