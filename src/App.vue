<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">欢迎登录</h2>
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">账号</label>
          <div class="input-wrapper">
            <i class="icon user-icon"></i>
            <input
                id="username"
                v-model="username"
                placeholder="请输入用户"
                type="text"
            />
          </div>
        </div>

        <div class="input-group">
          <label for="password">密码</label>
          <div class="input-wrapper">
            <i class="icon lock-icon"></i>
            <input
                id="password"
                v-model="password"
                placeholder="请输入密码"
                type="password"
            />
          </div>
        </div>
        <div class="input-group">
          <label for="captcha">验证码</label>
          <div class="captcha-wrapper">
            <div class="captcha-container">
              <img
                  :class="{ 'is-loading': !imgLoaded }"
                  :src="captchaUrl"
                  alt="验证码"
                  class="captcha-img"
                  @click="refreshCaptcha"
                  @load="imgLoaded = true"
              />
            </div>
            <input
                id="captcha"
                v-model="captcha"
                class="captcha-input"
                maxlength="6"
                placeholder="请输入验证码"
                type="text"
            />
          </div>
        </div>


        <div class="actions">
          <a class="forgot-password" href="#">忘记密码</a>
          <div class="button-group">
            <button class="btn login-btn" type="submit">登录</button>
            <button class="btn register-btn" type="button" @click="handleRegister">
              注册
            </button>


            <button class="btn register-btn" @click="notify">点我</button>


          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, onMounted, ref} from 'vue'
import axios from 'axios'

const captchaUrl = ref('')
const captcha = ref('')
const imgLoaded = ref(false)

// 获取全局 $toast（可选）
const {appContext} = getCurrentInstance()
const $toast = appContext.config.globalProperties?.$toast

function notify() {
  $toast.success('保存成功！')
}


// 刷新验证码函数
const refreshCaptcha = async () => {
  imgLoaded.value = false
  try {
    const response = await axios.get('https://wanqiu.cloudns.ch:4433/api/captcha')
    if (response.data.url) {
      captchaUrl.value = response.data.url
    }
  } catch (error) {
    console.error('刷新验证码失败', error)
    $toast?.error?.('验证码加载失败') // 若有全局提示系统
  }
}

// 初始加载
onMounted(() => {
  refreshCaptcha()
})
</script>

<style scoped>
/* 验证码整体区域 */
.captcha-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem; /* 使用相对单位控制图片和输入框的间距 */
}

/* 验证码容器（用于定位伪元素动画） */
.captcha-container {
  position: relative;
  width: 10rem;
  height: 3.75rem;
}

/* 验证码图片 */
.captcha-img {
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 0.5rem;
  cursor: pointer;
  object-fit: cover;
  transition: filter 0.6s ease-in-out, opacity 0.6s ease, transform 0.3s ease;
  background: linear-gradient(135deg, #f2f2f2, #e0e0e0);
}

/* 加载中和点击时的相同效果 */
.captcha-img.is-loading,
.captcha-img:active {
  transform: scale(0.95);
  filter: blur(5px) grayscale(50%);
  opacity: 0.6;
}

/* 旋转加载动画 */
.captcha-container::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2.2rem; /* 使用相对单位 */
  height: 2.2rem; /* 使用相对单位 */
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: #333;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: spin 1s linear infinite;
  opacity: 0;
  pointer-events: none;
  z-index: 2;
}

/* 仅在加载时显示旋转圈 */
.captcha-img.is-loading + .captcha-container::before {
  opacity: 1;
}

/* 旋转动画 */
@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* 输入框样式 */
.captcha-wrapper input {
  width: 7.5rem;
  padding: 0.625rem 0.75rem;
  font-size: 1rem;
  color: #222;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.25s ease;
}

/* 输入框获得焦点时的样式 */
.captcha-wrapper input:focus {
  border-color: #5a67d8;
  box-shadow: 0 0 0 3px rgba(90, 103, 216, 0.2);
}


/* 通用基础 */
* {
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  font-family: Arial, sans-serif;
}

/* 页面布局 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
}

.login-box {
  width: 100%;
  max-width: 30rem;
  padding: 2rem;
  border-radius: 0.8rem;
  box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.1);
  background: #fff;
}

.login-title {
  user-select: none;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

/* 表单输入组 */
.input-group {
  margin-bottom: 1.25rem;
}

.input-group label {
  font-size: 0.875rem;
  color: #333;
  margin-bottom: 0.375rem;
  display: block;
}

.input-wrapper {
  position: relative;
}

.input-wrapper .icon {
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #aaa;
}

.input-wrapper input {
  width: 100%;
  padding: 0.625rem 0.75rem 0.625rem 2.75rem;
  font-size: 1rem;
  color: #222;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.25s ease;
}

.input-wrapper input:focus {
  border-color: #5a67d8;
  box-shadow: 0 0 0 3px rgba(90, 103, 216, 0.2);
}


/* 忘记密码链接 */
.forgot-password {
  font-size: 0.8125rem;
  color: #666;
  text-decoration: none;
  display: block;
  text-align: right;
  margin-top: 0.375rem;
  border-bottom: 2px solid black;
  line-height: 1.5;
  padding-bottom: 1px;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.forgot-password:hover {
  color: #000;
  border-bottom-color: #000;
}

/* 按钮 */
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  gap: 1rem;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.login-btn {
  background: #000;
  color: #fff;
}

.login-btn:hover {
  background: #222;
  transform: scale(1.03);
}

.register-btn {
  background: #f1f1f1;
  color: #333;
  border: 1px solid #ddd;
}

.register-btn:hover {
  background: #e2e2e2;
  transform: scale(1.03);
}

/* 图标 */
.user-icon::before {
  content: "👤";
}

.lock-icon::before {
  content: "🔒";
}
</style>



