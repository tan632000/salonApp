import axios from 'axios'
import store from '../redux/store'

const axiosClient = axios.create({
  baseURL: 'http://192.168.25.2:8600/api/v1',
  headers: {
    'content-type': 'application/json',
  },
})

axiosClient.interceptors.request.use(config => {
  const token = store.getState().user.token
  if (token.length > 0) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.params = {
    ...config.params,
  }
  return config
})

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  error => {
    throw error
  }
)

export default axiosClient
