// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/router/index.js'
import store from './stores/store/index.js'

console.log('🔍 开始加载Vue应用')

// 检查各个模块
try {
  console.log('✅ Vue模块加载成功')
  console.log('✅ App组件加载成功:', App)
  console.log('✅ 路由加载成功:', !!router)
  console.log('✅ 状态管理加载成功:', !!store)
} catch (error) {
  console.error('❌ 模块加载失败:', error)
}

const app = createApp(App)
console.log('✅ Vue应用实例创建成功')

// 使用插件
try {
  app.use(store)
  console.log('✅ Store插件注册成功')
  app.use(router)
  console.log('✅ Router插件注册成功')
} catch (error) {
  console.error('❌ 插件注册失败:', error)
}

// 挂载应用
try {
  app.mount('#app')
  console.log('✅ 应用挂载成功')
} catch (error) {
  console.error('❌ 应用挂载失败:', error)
}