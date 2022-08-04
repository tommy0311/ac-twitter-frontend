import axios from "axios";
import Swal from "sweetalert2";
import process from "process";
const baseURL = process.env.VUE_APP_BASE_URL || "https://twitterac.herokuapp.com/api";

const axiosInstance = axios.create({
  baseURL,
  validateStatus: () => { return true }
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

    if (token) { // 如果 token 存在的話，則帶入到 headers 當中
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  err => Promise.reject(err)
)

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
});
