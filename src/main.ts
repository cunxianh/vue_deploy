import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import GlobalLoading from '@/components/feature/GlobalLoading.vue'
import './style.css'


const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.component('GlobalLoading', GlobalLoading) // 全局註冊！
app.use(router).mount('#app')