const API_BASE = import.meta.env.VITE_API_BASE  // ✅ 修正埠號
import axios from "axios"
import { useLoadingStore } from '@/stores/loading'

const API = axios.create({
  baseURL: API_BASE
})

API.interceptors.request.use(config => {
  const loadingStore = useLoadingStore()
  loadingStore.start()
  return config
})

API.interceptors.response.use(
  response => {
    const loadingStore = useLoadingStore()
    loadingStore.stop()
    return response
  },
  error => {
    const loadingStore = useLoadingStore()
    loadingStore.stop()
    return Promise.reject(error)
  }
)

export default API