"use strict";(self["webpackChunkalphitter"]=self["webpackChunkalphitter"]||[]).push([[446],{37438:(e,t,s)=>{s.d(t,{Z:()=>v});s(68309);var i=function(){var e=this,t=e._self._c;return t("div",{staticStyle:{position:"relative"}},[e.replyModalShow?t("PopoutReply"):e._e(),e.writingTweetModalShow?t("PopoutWritingTweet"):e._e(),t("div",{attrs:{id:"navpillHeader-container"}},[e._m(0),t("div",{staticClass:"navpill-info-container flex-column"},[t("router-link",{staticClass:"navpillHeader-title",attrs:{to:{name:"user-tweets"}}},[e._v(" "+e._s(e.currentUser.name)+" ")]),t("p",{staticClass:"post-number-hint"},[e._v(" "+e._s(e.currentUser.tweetsCount)+" "),t("span",[e._v("推文")])])],1)])],1)},r=[function(){var e=this,t=e._self._c;return t("a",{attrs:{href:"javascript:history.back()"}},[t("img",{staticClass:"arrow-icon",attrs:{src:s(57139),alt:"回到上一頁"}})])}],n=s(4648),a=s(63822),l=s(46031),o=s(49827);const c={name:"NavpillHeader",components:{PopoutReply:l["default"],PopoutWritingTweet:o["default"]},data:function(){return{isLoading:!0}},computed:(0,n.Z)({},(0,a.rn)(["currentUser","replyModalShow","writingTweetModalShow"]))},u=c;var d=s(43736),p=(0,d.Z)(u,i,r,!1,null,null,null);const v=p.exports},14354:(e,t,s)=>{s.d(t,{Z:()=>d});var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"d-flex",attrs:{id:"navpillUser-container"}},[t("div",{staticClass:"navpill-title-container"},[e.isCurrentUser?t("router-link",{staticClass:"navpill-title",class:e.isTweetsActive,attrs:{to:{name:"user-tweets"}}},[e._v(" 推文 ")]):t("router-link",{staticClass:"navpill-title",class:e.isTweetsActive,attrs:{to:{name:"user-id-tweets",params:{userId:e.user.id}}}},[e._v(" 推文 ")])],1),t("div",{staticClass:"navpill-title-container"},[e.isCurrentUser?t("router-link",{staticClass:"navpill-title",class:e.isRepliesActive,attrs:{to:{name:"user-replied_tweets"}}},[e._v(" 回覆 ")]):t("router-link",{staticClass:"navpill-title",class:e.isRepliesActive,attrs:{to:{name:"user-id-replied_tweets",params:{userId:e.user.id}}}},[e._v(" 回覆 ")])],1),t("div",{staticClass:"navpill-title-container"},[e.isCurrentUser?t("router-link",{staticClass:"navpill-title",class:e.isLikesActive,attrs:{to:{name:"user-likes"}}},[e._v(" 喜歡的內容 ")]):t("router-link",{staticClass:"navpill-title",class:e.isLikesActive,attrs:{to:{name:"user-id-likes",params:{userId:e.user.id}}}},[e._v(" 喜歡的內容 ")])],1)])},r=[],n=s(4648),a=s(63822);const l={name:"NavpillUser",props:{initialUser:{type:Object,default:function(){return{id:-1,account:"",email:"",name:"",avatar:"",cover:"",introduction:"",role:"user",followingCount:-1,followerCount:-1}}},initialIsCurrentUser:{type:Boolean,require:!0},initialTweetsActive:{type:String,default:""},initialRepliesActive:{type:String,default:""},initialLikesActive:{type:String,default:""}},data:function(){return{user:(0,n.Z)({},this.initialUser),isCurrentUser:this.initialIsCurrentUser,isTweetsActive:this.initialTweetsActive,isRepliesActive:this.initialRepliesActive,isLikesActive:this.initialLikesActive,routeName:"",isLoading:!0}},computed:(0,n.Z)({},(0,a.rn)(["currentUser"])),watch:{initialUser:function(e){this.user=(0,n.Z)((0,n.Z)({},this.user),e),this.user=e},initialTweetsActive:function(e){this.isTweetsActive=e},initialRepliesActive:function(e){this.isRepliesActive=e},initialLikesActive:function(e){this.isLikesActive=e}}},o=l;var c=s(43736),u=(0,c.Z)(o,i,r,!1,null,null,null);const d=u.exports},83446:(e,t,s)=>{s.r(t),s.d(t,{default:()=>y});var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"d-flex justify-content-center"},[t("NavBar",{attrs:{"initial-profile":e.isProfile}}),t("div",{staticClass:"main-wrapper"},[t("NavpillHeader"),t("div",{staticClass:"container-for-scroll scrollbar"},[t("UserProfile",{attrs:{"initial-user":e.user,"is-modal-shown":e.isModalShown,"show-modal":e.showModal,"close-modal":e.closeModal}}),t("NavpillUser",{attrs:{"initial-user":e.user,"initial-is-current-user":e.isCurrentUser,"initial-tweets-active":e.isTweetsActive,"initial-replies-active":e.isRepliesActive,"initial-likes-active":e.isLikesActive}}),t("router-view",{attrs:{"initial-tweets":e.tweets,"initial-replies":e.replies,"initial-likes":e.likes},on:{updateLikes:e.fetchUserTweetsRepliesLikes}})],1)],1),t("div",{attrs:{id:"recommendColumn-container"}},[e._m(0),e.isRecommendUsersLoading?t("LoadingSpinner"):t("RecommendColumn",{attrs:{"initial-recommend-users":e.recommendUsers},on:{updateRecommendColumn:e.updatePage}})],1),e.isModalShown?t("PopoutEditProfile",{attrs:{"close-modal":e.closeModal,user:e.user}}):e._e()],1)},r=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"recommendHeader"},[t("h1",[e._v("推薦跟隨")])])}],n=s(50124),a=s(48534),l=s(4648),o=(s(68309),s(21249),s(5212),s(41539),s(48164)),c=s(75676),u=s(37438),d=function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-column",attrs:{id:"userProfile-container"}},[t("img",{staticClass:"profile-background-img",attrs:{src:e._f("emptyCover")(e.currentUser.cover),alt:""}}),t("img",{staticClass:"profile-headshot",attrs:{src:e._f("emptyImage")(e.currentUser.avatar),alt:"個人頭像"}}),t("div",{staticClass:"profile-info-container"},[t("div",{staticClass:"d-flex justify-content-end"},[t("button",{staticClass:"edit-profile-btn empty-btn-style ml-4",on:{click:e.showModal}},[e._v(" 編輯個人資料 ")])]),t("h4",{staticClass:"user-name mt-4"},[e._v(" "+e._s(e.currentUser.name)+" ")]),t("p",{staticClass:"user-acount"},[t("span",[e._v("@")]),e._v(" "+e._s(e.currentUser.account)+" ")]),t("p",{staticClass:"user-describe mt-2"},[e._v(" "+e._s(e.currentUser.introduction)+" ")]),t("div",{staticClass:"user-follow-info d-flex mt-2"},[t("router-link",{attrs:{to:{name:"user-followinglist"}}},[t("span",{staticClass:"following-number"},[e._v(" "+e._s(e.user.followingCount)+" 個 ")]),t("span",{staticClass:"ml-1"},[e._v("跟隨中")])]),t("router-link",{attrs:{to:{name:"user-followerlist"}}},[t("span",{staticClass:"follower-number ml-5"},[e._v(" "+e._s(e.user.followerCount)+" 位 ")]),t("span",{staticClass:"ml-1"},[e._v("跟隨者")])])],1)])])},p=[],v=s(83459),f=s(63822),m=s(24239);const w={name:"UserProfile",mixins:[v.Lf],props:{initialUser:{type:Object,default:function(){return(0,l.Z)((0,l.Z)({},m.Z.state.currentUser),{},{followingCount:-1,followerCount:-1})}},showModal:{type:Function}},data:function(){return{user:(0,l.Z)({},this.initialUser),isLoading:!0}},computed:(0,l.Z)({},(0,f.rn)(["currentUser"])),watch:{initialUser:function(e){this.user=(0,l.Z)((0,l.Z)({},this.user),e)}}},h=w;var U=s(43736),A=(0,U.Z)(h,d,p,!1,null,null,null);const C=A.exports;var g=s(14354),k=s(89534),Z=s(76163),_=s(78390),R=s(64396);const L={name:"UserSelf",components:{NavBar:o.Z,RecommendColumn:c.Z,NavpillHeader:u.Z,UserProfile:C,NavpillUser:g.Z,PopoutEditProfile:k["default"],LoadingSpinner:R.Z},beforeRouteUpdate:function(e,t,s){this.updateRouteName(e.name),s()},data:function(){return{user:{id:-1,account:"",email:"",name:"",avatar:"",cover:"",introduction:"",role:"user",followingCount:-1,followerCount:-1},tweets:[],replies:[],likes:[],currentUserLikes:[],recommendUsers:[],isCurrentUser:!1,isTweetsActive:"",isRepliesActive:"",isLikesActive:"",isProfile:!0,isProcessing:!1,isModalShown:!1,isRecommendUsersLoading:!0}},computed:(0,l.Z)({},(0,f.rn)(["currentUser"])),watch:{user:"fetchUserTweetsRepliesLikes"},created:function(){this.fetchFollowingsFollowers(this.currentUser.id),this.fetchRecommendUsers(),this.isCurrentUser=!0,this.updateRouteName(this.$route.name)},methods:{closeModal:function(){this.isModalShown=!1},showModal:function(){this.isModalShown=!0},updateRouteName:function(e){this.isTweetsActive="user-tweets"===e?"navpill-title-active":"",this.isRepliesActive="user-replied_tweets"===e?"navpill-title-active":"",this.isLikesActive="user-likes"===e?"navpill-title-active":""},updatePage:function(){this.fetchFollowingsFollowers(this.currentUser.id),this.fetchRecommendUsers(),this.fetchUserTweetsRepliesLikes()},fetchFollowingsFollowers:function(e){var t=this;return(0,a.Z)((0,n.Z)().mark((function s(){var i,r,a,o;return(0,n.Z)().wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,_.Z.getUserFollowings({userId:e});case 3:return i=s.sent,r=i.data,s.next=7,_.Z.getUserFollowers({userId:e});case 7:a=s.sent,o=a.data,t.user=(0,l.Z)((0,l.Z)({},t.currentUser),{},{followingCount:r.length,followerCount:o.length}),s.next=16;break;case 12:s.prev=12,s.t0=s["catch"](0),console.error(s.t0.message),Z.FN.fire({icon:"error",title:"無法取得 follow 資料，請稍後再試"});case 16:case"end":return s.stop()}}),s,null,[[0,12]])})))()},fetchUserTweetsRepliesLikes:function(){var e=this;return(0,a.Z)((0,n.Z)().mark((function t(){var s,i,r;return(0,n.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,_.Z.getUserLikes({userId:e.currentUser.id});case 3:return s=t.sent,e.currentUserLikes=s.data,t.next=7,_.Z.getUserTweets({userId:e.user.id});case 7:return i=t.sent,e.tweets=i.data.map((function(t){return t.isCurrentUser=t.UserId===e.currentUser.id,e.currentUserLikes.some((function(e){return e.TweetId===t.id}))?(0,l.Z)((0,l.Z)({},t),{},{isLiked:!0}):(0,l.Z)((0,l.Z)({},t),{},{isLiked:!1})})),t.next=11,_.Z.getUserReplies({userId:e.user.id});case 11:r=t.sent,e.replies=r.data.map((function(t){return t.isCurrentUser=t.UserId===e.currentUser.id,(0,l.Z)({},t)})),e.likes=e.currentUserLikes.map((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLiked:!0})})),t.next=20;break;case 16:t.prev=16,t.t0=t["catch"](0),console.error(t.t0.message),Z.FN.fire({icon:"error",title:"無法取得 Tweets Replies Likes 資料"});case 20:case"end":return t.stop()}}),t,null,[[0,16]])})))()},fetchRecommendUsers:function(){var e=this;return(0,a.Z)((0,n.Z)().mark((function t(){var s,i,r,a;return(0,n.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.isRecommendUsersLoading=!0,t.next=4,_.Z.getUserFollowings({userId:e.currentUser.id});case 4:return s=t.sent,i=s.data,r=i,t.next=9,_.Z.getTopUsers();case 9:a=t.sent,e.recommendUsers=a.data.map((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isFollowed:r.some((function(t){return t.followingId===e.id}))})})),e.isRecommendUsersLoading=!1,t.next=19;break;case 14:t.prev=14,t.t0=t["catch"](0),console.error(t.t0),e.isRecommendUsersLoading=!1,Z.FN.fire({icon:"error",title:"無法取得 RecommendUsers 資料，請稍後再試"});case 19:case"end":return t.stop()}}),t,null,[[0,14]])})))()}}},x=L;var T=(0,U.Z)(x,i,r,!1,null,null,null);const y=T.exports},57139:e=>{e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABTSURBVHgBrdLRCQAgCATQo0ncfylHKRTqQwrM88Cojx6UYl6iqlNEvDLBCwBQQyJg5y+kChyEARxhAUc2UC27P9CRlufYQn/s3tAtZqH+sY9QFlmZh9qG/+G4HQAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=446.30d46340.js.map