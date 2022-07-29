import { apiHelper } from './../utils/helpers'

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  getReplies({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  }
}