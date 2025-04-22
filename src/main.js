// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
//
// createApp(App).mount('#app')

import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import ToastPlugin from './plugins/toast' // ✅ 引入插件

const app = createApp(App)

app.use(ToastPlugin)  // ✅ 安装插件

app.mount('#app')
