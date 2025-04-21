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
                type="text"
                v-model="username"
                placeholder="请输入用户"
            />
          </div>
        </div>

        <div class="input-group">
          <label for="password">密码</label>
          <div class="input-wrapper">
            <i class="icon lock-icon"></i>
            <input
                id="password"
                type="password"
                v-model="password"
                placeholder="请输入密码"
            />
          </div>
        </div>

        <!-- 图片验证码 -->
        <div class="input-group">
          <label for="captcha">验证码</label>
          <div class="captcha-wrapper">
            <img
                :src="captchaUrl"
                alt="验证码"
                class="captcha-img"
                @click="refreshCaptcha"
            />
            <input
                id="captcha"
                class="input-group"
                type="text"
                v-model="captcha"
                placeholder="请输入验证码"
                maxlength="6"
            />
          </div>
        </div>

        <div class="actions">
          <a href="#" class="forgot-password">忘记密码</a>
          <div class="button-group">
            <button type="submit" class="btn login-btn">登录</button>
            <button type="button" class="btn register-btn" @click="handleRegister">
              注册
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
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

/* 验证码区域 */
.captcha-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.captcha-img {
  width: 10rem;
  height: 3.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-right: 1rem;
  object-fit: cover;
}

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
  margin: auto;
}

.captcha-wrapper input:focus {
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


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 创建响应式变量来保存验证码图片的URL
const captchaUrl = ref('')

// 创建变量来绑定用户输入的验证码
const captcha = ref('')

// 处理点击刷新验证码的函数
const refreshCaptcha = async () => {
  try {
    // 发送GET请求，获取新的验证码 URL
    const response = await axios.get('https://wanqiu.cloudns.ch:4433/api/captcha')

    // 更新验证码图片URL
    if (response.data.url) {
      captchaUrl.value = response.data.url
    }
  } catch (error) {
    console.error('刷新验证码失败', error)
    // 可以根据需求添加错误处理逻辑，如提示用户刷新失败
  }
}

// 页面加载时触发验证码请求
onMounted(() => {
  refreshCaptcha()
})
</script>
