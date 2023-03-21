import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores/store' //引入状态管理
import '@/assets/style/index.scss'
import ElementPlugins from '@/plugins/element-plus'
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlugins)
app.mount('#app')
