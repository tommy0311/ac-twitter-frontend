import { apiHelper } from './../utils/helpers'
<<<<<<< HEAD

export default {
  getTweets() {
    return apiHelper.get(`/tweets`)
=======
const getToken = () => localStorage.getItem('token')

export default {
  getTweets() {
    return apiHelper.get(`/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
>>>>>>> 2837a79f90acbd5a6bbc3a40a0cf8e1519cc2529
  },
}