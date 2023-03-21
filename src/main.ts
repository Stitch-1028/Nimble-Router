import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores/store' //引入状态管理
import Vchart from '@/plugins/v-chart'
import '@/assets/style/index.scss'
import ElementPlugins from '@/plugins/element-plus'
const app = createApp(App)
// 热重载
if (import.meta.hot) {
  import.meta.hot.accept()
}
app.use(pinia)
app.use(router)
app.use(Vchart)
app.use(ElementPlugins)
app.mount('#app')
