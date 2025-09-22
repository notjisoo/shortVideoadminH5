import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'

// 中文化
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  app.use(Antd)
  return {
    app
  }
}
