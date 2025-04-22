<template>
  <div class="toast-container">
    <TransitionGroup name="toast" tag="div">
      <div
          v-for="(toast, index) in toasts"
          :key="toast.id"
          :class="['toast', toast.type]"
      >
        <span class="icon">{{ toast.icon }}</span>
        <span class="message">{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import {ref} from 'vue'

let id = 0
const toasts = ref([])

function addToast(toast) {
  const newToast = {
    id: id++,
    ...toast
  }
  toasts.value.push(newToast)

  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== newToast.id)
  }, 3000)
}

defineExpose({addToast})
</script>

<style scoped>
.toast-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  pointer-events: none;
}

/* 动画 */
.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-leave-active {
  transition: all 0.3s ease;
}


.toast {
  pointer-events: auto;
  margin: 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: bold;
  background-color: #fdfdfd;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: flex-start;
  max-width: 90%;
  min-width: 80px;
  word-break: break-word;
  line-height: 1.5;
  color: #333;
  text-align: left;
  flex-wrap: wrap;
}

.icon {
  margin-right: 10px;
  font-size: 18px;
  flex-shrink: 0;
}

.message {
  flex: 1;
  word-break: break-word;
}


/* 类型样式 */
.toast.success {
  border-color: #a3e635;
  background-color: #ecfccb;
}

.toast.error {
  border-color: #f87171;
  background-color: #fee2e2;
}

.toast.warning {
  border-color: #facc15;
  background-color: #fef9c3;
}

.toast.info {
  border-color: #38bdf8;
  background-color: #e0f2fe;
}

.icon {
  margin-right: 10px;
  font-size: 18px;
}
</style>
