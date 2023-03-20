import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style/index.scss'
import ElementPlugins from '@/plugins/element-plus'
const app = createApp(App)
app.use(router)
app.use(ElementPlugins)
app.mount('#app')
