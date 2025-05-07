import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import ToastPlugin from './plugins/toast'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(ToastPlugin)

app.mount('#app')
