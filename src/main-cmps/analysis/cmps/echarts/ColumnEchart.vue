<template>
  <BaseEchart :option="option"></BaseEchart>
</template>

<script setup lang="ts">
import BaseEchart from './BaseEchart.vue'
import type { EChartsOption } from 'echarts'
const option: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
  ],
}
</script>

<style scoped lang="less"></style>
