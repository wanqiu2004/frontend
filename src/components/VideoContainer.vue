<template>
    <div class="video-preview-container" v-if="videoUrl">
      <img :src="`${videoUrl}/index.jpg`" alt="Video Cover" class="video-cover">
      <video
        :src="`${videoUrl}/index.mp4`"
        class="video-preview"
        preload="auto"
        loop
        muted
        ref="videoElement"
      ></video>
    </div>
    <p>{{ title }}</p>
  </template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { SERVER_URL } from '@/config/server.js';
import md5 from 'blueimp-md5'; // 请确保安装：npm install blueimp-md5

const videoUrl = ref('');
const videoElement = ref(null);
const title = ref('碟中谍9由中国女素人接任？');

onMounted(async () => {
  try {
    // 获取 <p> 标签文本作为标题
    const title = document.querySelector('p')?.textContent?.trim() || '';
    const hashKey = md5(title).slice(0, 7); // 计算 MD5 并取前7位

    const res = await fetch(`${SERVER_URL}/api/videoInfo?${hashKey}`);
    const json = await res.json();
    videoUrl.value = json.videoInfo;

    // 设置事件监听
    const container = document.querySelector('.video-preview-container');
    const cover = document.querySelector('.video-cover');
    const video = videoElement.value;

    if (container && cover && video) {
      container.addEventListener('mouseenter', () => {
        cover.style.opacity = '0';
        video.style.opacity = '1';
        video.play();
      });

      container.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
        video.style.opacity = '0';
        cover.style.opacity = '1';
      });
    }
  } catch (err) {
    console.error('获取视频信息失败:', err);
  }
});

</script>
<style>
  .video-preview-container {
    position: relative;
    width: 640px;
    height: 360px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
  }

  .video-preview-container:hover {
    transform: scale(1.05);
  }

  .video-cover, .video-preview {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease;
  }

  .video-preview {
    opacity: 0;
    object-fit: contain;
  }
</style>