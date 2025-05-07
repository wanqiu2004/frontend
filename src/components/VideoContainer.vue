<template>
  <div class="video-preview-container" ref="container" v-if="videoUrl">
    <img :src="`${videoUrl}/index.jpg`" alt="Video Cover" class="video-cover" />
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
import { ref, onMounted, watch, nextTick } from 'vue';
import { SERVER_URL } from '@/config/server.js';
import md5 from 'blueimp-md5';

const videoUrl = ref('');
const videoElement = ref<HTMLVideoElement | null>(null);
const container = ref<HTMLElement | null>(null);
const title = ref('碟中谍9由中国女素人接任？');

const hash = "f3500fb";

// 请求视频 URL
onMounted(async () => {
  try {
    const res = await fetch(`${SERVER_URL}/api/videoInfo?${hash}`);
    const json = await res.json();
    videoUrl.value = json.videoInfo;
  } catch (err) {
    console.error('获取视频信息失败:', err);
  }
});

// 等待 videoUrl 改变后，DOM 渲染完成再绑定事件
watch(videoUrl, async (url) => {
  if (!url) return;

  // 等待 DOM 更新
  await nextTick();

  const video = videoElement.value;
  const cover = container.value?.querySelector('.video-cover') as HTMLElement;

  if (container.value && cover && video) {
    container.value.addEventListener('mouseenter', () => {
      cover.style.opacity = '0';
      video.style.opacity = '1';
      video.play();
    });

    container.value.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      video.style.opacity = '0';
      cover.style.opacity = '1';
    });
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
  border-radius: 16px;
  backdrop-filter: blur(4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  background: linear-gradient(145deg, #1f1f1f, #2b2b2b);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.video-preview-container:hover {
  transform: scale(1.045);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.4);
}

.video-cover,
.video-preview {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  transition: opacity 0.6s ease;
}

.video-preview {
  opacity: 0;
  object-fit: cover;
  filter: brightness(1.05) contrast(1.1) saturate(1.2);
}

/* Optional: subtle zoom-in animation */
.video-preview-container:hover .video-cover {
  transform: translate(-50%, -50%) scale(1.02);
}

.video-preview-container:hover .video-preview {
  transform: translate(-50%, -50%) scale(1.02);
}
</style>
