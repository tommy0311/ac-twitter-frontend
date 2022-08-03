import { apiHelper } from './../utils/helpers'

export default {
  postReply(tweetId, comment ) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, { comment })
  },
}