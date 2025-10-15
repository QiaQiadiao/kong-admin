<template>
  <h1>StoryList</h1>
  <YoutubeIframeDialog v-model="isYoutubePalyShow" :video-id="youtubeVideoId" />
  <button class="btn" @click="handlePlay">点击预览youtube视频（请点击有惊喜）</button>
</template>

<script setup lang="ts">
import YoutubeIframeDialog from '@/main-cmps/story/YoutubeIframeDialog.vue'
import { ref } from 'vue'
const isYoutubePalyShow = ref(false)
const youtubeVideoId = ref('')
function handlePlay() {
  isYoutubePalyShow.value = true
  youtubeVideoId.value = 'dQw4w9WgXcQ'
}
</script>

<style scoped lang="less">
.btn {
  margin-top: 20px;
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

}
</style>
