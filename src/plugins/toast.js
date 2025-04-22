import {createApp, h} from 'vue'
import Toast from '@/components/Toast.vue'

let toastInstance

export default {
    install(app) {
        const mountNode = document.createElement('div')

        mountNode.style.position = 'fixed'
        mountNode.style.top = '0'
        mountNode.style.left = '0'
        mountNode.style.width = '100%'
        mountNode.style.pointerEvents = 'none'
        mountNode.style.zIndex = '9999'

        document.body.appendChild(mountNode)

        const vm = createApp({
            render() {
                return h(Toast, {ref: 'toast'})
            }
        }).mount(mountNode)

        toastInstance = vm.$refs.toast

        app.config.globalProperties.$toast = {
            show: (msg, options = {}) =>
                toastInstance.addToast({message: msg, ...options}),

            success: (msg) =>
                toastInstance.addToast({message: msg, type: 'success', icon: '✔'}),

            error: (msg) =>
                toastInstance.addToast({message: msg, type: 'error', icon: '✗'}),

            warning: (msg) =>
                toastInstance.addToast({message: msg, type: 'warning', icon: '⚠'}),

            info: (msg) =>
                toastInstance.addToast({message: msg, type: 'info', icon: 'ⓘ'})
        }
    }
}
