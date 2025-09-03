import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './routers/router' // 导入路由
import 'core-js/stable/date';
import loading from'./components/loading/index.vue'
const app = createApp(App)
app.component('loading',loading)

app.config.globalProperties.$axios = axios
// 先设置 movieApi
const movieApi = {
  getNowPlaying: () => axios.get('http://39.97.33.178/api/movieOnInfoList?cityId=10'),
  getComingSoon: () => axios.get('http://39.97.33.178/api/movieComingList?cityId=10')
}

app.provide('movieApi', movieApi) // 在挂载前提供依赖
app.use(router)  // 使用路由

// 只调用一次 mount，且在所有配置完成后
app.mount('#app')