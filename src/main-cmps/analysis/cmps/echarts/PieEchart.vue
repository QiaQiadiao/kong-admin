<template>
  <BaseEchart :option="option"></BaseEchart>
</template>

<script setup lang="ts">
import BaseEchart from './BaseEchart.vue'
import type { EChartsOption } from 'echarts'
const option: EChartsOption = {
  title: {
    // text: '部门员工人数占比图',
    // subtext: 'Fake Data',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: '部门员工人数图',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '研发部' },
        { value: 735, name: '行政部' },
        { value: 580, name: '销售部' },
        { value: 484, name: '运营部' },
        { value: 300, name: '供应链' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}
</script>

<style scoped lang="less"></style>
