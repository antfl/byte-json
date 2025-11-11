import { createApp } from 'vue'
import './style.less'
import 'monaco-editor/min/vs/editor/editor.main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
