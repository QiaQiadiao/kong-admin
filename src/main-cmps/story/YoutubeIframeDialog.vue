<template>
  <el-dialog
    v-model="isVisible"
    title=""
    :width="props?.width ? props?.width + 40 : 680"
    class="ph-dialog"
    @close="handleClose"
    @open="handleOpen"
  >
    <div v-loading="loading" element-loading-text="视频加载中...">
      <div id="youtube"></div>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import YoutubeIframePlay from '@/utils/sdk/youtubeIframePlay'
import { ref, computed, onMounted } from 'vue'
interface Props {
  modelValue: boolean
  videoId: string
  width?: number
  height?: number
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const isVisible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
const handleClose = () => {
  // 销毁播放器dom
  player.value.destroy()
}
const player = ref<any>()
const loading = ref(false)
const handleOpen = () => {
  loading.value = true
  // 初始化一个播放器
  player.value = new window.YT.Player('youtube', {
    height: props?.height || 360,
    width: props?.width || 640,
    videoId: props.videoId,
    events: {
      onReady: () => {
        loading.value = false
      }
    }
  })
}
onMounted(() => {
  // 插入youtube播放器sdk
  YoutubeIframePlay.getInstance()
})
</script>
<style lang="scss" scoped></style>
