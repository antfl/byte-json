import { createApp } from 'vue'
import './style.less'
import 'monaco-editor/min/vs/editor/editor.main.css'
import App from './App.vue'
import router from './router'
import { setupMonacoEnvironment } from './utils/monaco'
import { showBrandInfo } from './utils/console'

// 配置 Monaco Editor Worker
setupMonacoEnvironment()

// 显示品牌信息
showBrandInfo()

// 创建并挂载应用
const app = createApp(App)
app.use(router)
app.mount('#app')
