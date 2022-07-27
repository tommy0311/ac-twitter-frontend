import { apiHelper } from './../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get('/get_current_user')
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
<<<<<<< HEAD
  getTopUsers() {
    return apiHelper.get('/users/top')
  }
=======
>>>>>>> 2837a79f90acbd5a6bbc3a40a0cf8e1519cc2529
}