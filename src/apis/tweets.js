import { apiHelper } from './../utils/helpers'

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  }
}