import {createApp} from 'vue'
import './style.css'
import App from './components/VideoContainer.vue'
import ToastPlugin from './plugins/toast'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(ToastPlugin)

app.mount('#app')
