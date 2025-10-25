// src/utils/api.ts
import axios from 'axios'



const api = axios.create({
    baseURL: 'http://localhost:3000/api',
  timeout: 10000
})

// 可加 token 攔截器
api.interceptors.request.use(config => {
  const token = import.meta.env.VITE_token;

  console.log('Using token:', token);

  
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api