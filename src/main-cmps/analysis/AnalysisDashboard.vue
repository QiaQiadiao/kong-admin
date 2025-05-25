<template>
  <el-row :gutter="10">
    <template v-for="item in 4" :key="item">
      <el-col :span="6"><CountCard></CountCard></el-col>
    </template>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="7"
      ><ChartCard :data="data" :id="0"><LineEchart></LineEchart></ChartCard
    ></el-col>
    <el-col :span="10"
      ><ChartCard :data="data" :id="1"><PieEchart></PieEchart></ChartCard
    ></el-col>
    <el-col :span="7"
      ><ChartCard :data="data" :id="2"><ColumnEchart></ColumnEchart></ChartCard
    ></el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="10"
      ><ChartCard :data="data" :id="3"><RoseEchart></RoseEchart></ChartCard
    ></el-col>
  </el-row>
</template>

<script setup lang="ts">
import CountCard from './cmps/CountCard.vue'
import ChartCard from './cmps/ChartCard.vue'
import PieEchart from './cmps/echarts/PieEchart.vue'
import LineEchart from './cmps/echarts/LineEchart.vue'
import ColumnEchart from './cmps/echarts/ColumnEchart.vue'
import RoseEchart from './cmps/echarts/RoseEchart.vue'
import data from './cmps/echarts/data'
</script>

<style scoped lang="less"></style>
