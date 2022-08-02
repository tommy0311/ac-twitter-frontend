import { apiHelper } from "./../utils/helpers";

export default {
  getCurrentUser() {
    return apiHelper.get("/get_current_user");
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`);
  },
  getTopUsers() {
    return apiHelper.get("/users/top");
  },
  addFollowing({ userId }) {
    return apiHelper.post("/followships", { id: userId });
  },
  removeFollowing({ userId }) {
    return apiHelper.delete(`/followships/${userId}`);
  },
  getUserFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getUserFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserReplies({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLikes({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  putUser(user) {
    return apiHelper.put(`/users/${user.id}`, { ...user })
  },
  addLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`)
  },
  unLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`)
  }
}
