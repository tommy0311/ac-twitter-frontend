import { apiHelper } from './../utils/helpers'
const getAdminToken = () => localStorage.getItem('adminToken')

export default {
  getAdminTweets() {    
    return apiHelper.get(`/tweets`, {
      headers: { Authorization: `Bearer ${getAdminToken()}` }
    })
  },
  deleteTweet({tweetId}) {    
    return apiHelper.delete(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getAdminToken()}` }
    })
  },
}