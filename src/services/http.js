import axios from 'axios'
import store from '@/store'

const http = axios.create({ timeout: 90000 })
let onUnauthorized = () => {}
export function setUnauthorizedHandler(handler) { onUnauthorized = handler }
export function errorMessage(error) {
  if (error.code === 'ECONNABORTED') return '服務回應逾時，請稍後再試。首次啟動可能需要約一分鐘。'
  if (!error.response) return '目前無法連線，請檢查網路後再試。'
  return error.response.data?.message || '操作失敗，請稍後再試。'
}
http.interceptors.request.use((config) => {
  store.commit('requestStarted')
  const authorization = localStorage.getItem('authorization')
  return { ...config, headers: { ...config.headers, ...(!config.skipAuth && authorization ? { authorization } : {}) } }
})
function finish(config) { if (config) store.commit('requestFinished') }
http.interceptors.response.use((response) => {
  finish(response.config)
  return response
}, (error) => {
  finish(error.config)
  if (error.response?.status === 401 && !error.config?.skipAuth && localStorage.getItem('authorization') && error.config?.headers?.authorization === localStorage.getItem('authorization')) {
    localStorage.removeItem('authorization')
    store.commit('user', {})
    store.commit('headers', {})
    onUnauthorized()
  }
  return Promise.reject(error)
})
export default http
