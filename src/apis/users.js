import { apiHelper } from './../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get('/get_current_user')
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getTopUsers() {
    return apiHelper.get('/users/top')
  },
  addFollowing({userId}) {
    return apiHelper.post('/followships', { id:userId })
  },
  removeFollowing({ userId }) {
    return apiHelper.delete(`/followships/${userId}`)
  },
}