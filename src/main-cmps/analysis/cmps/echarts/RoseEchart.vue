<template>
  <BaseEchart :option="option"></BaseEchart>
</template>

<script setup lang="ts">
import BaseEchart from './BaseEchart.vue'
import type { EChartsOption } from 'echarts'
const option: EChartsOption = {
  legend: {
    top: 'bottom',
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [20, 100],
      center: ['50%', '40%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: 40, name: '游戏' },
        { value: 38, name: '本地生活' },
        { value: 32, name: '云服务' },
        { value: 30, name: '文娱' },
        { value: 28, name: '广告' },
        { value: 26, name: '金融' },
        { value: 22, name: 'AI' },
      ],
    },
  ],
}
</script>

<style scoped lang="less"></style>
