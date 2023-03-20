import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/index.css'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install: (app: any) => {
    app.use(ElMessage)
    app.use(ElMessageBox)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
