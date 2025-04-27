<template>
  <div class="toast-container">
    <TransitionGroup name="toast" tag="div" class="toast-list">
      <div
          v-for="toast in toasts"
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
import { ref } from 'vue'

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

defineExpose({ addToast })
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  pointer-events: none;
}

.toast-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 进入和离开动画 */
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  border: 1px solid #d1d5db;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  max-width: 320px;
  min-width: 200px;
  color: #1f2937;
  font-size: 15px;
  font-weight: 500;
  word-break: break-word;
}

.icon {
  font-size: 20px;
  flex-shrink: 0;
  color: inherit;
}

.message {
  flex: 1;
}

/* 业务风格的类型色彩 */
.toast.success {
  border-color: #22c55e;
  background-color: rgba(34, 197, 94, 0.1);
}

.toast.error {
  border-color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
}

.toast.warning {
  border-color: #f59e0b;
  background-color: rgba(245, 158, 11, 0.1);
}

.toast.info {
  border-color: #3b82f6;
  background-color: rgba(59, 130, 246, 0.1);
}
</style>
