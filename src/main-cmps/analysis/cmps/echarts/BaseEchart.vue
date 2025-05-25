<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
const echartRef = ref()
interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()
onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!, 'light')
  echartInstance.setOption(props.option)
})
</script>

<style scoped lang="less">
.echart {
  height: 300px;
}
</style>
