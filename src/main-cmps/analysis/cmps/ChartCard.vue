<template>
  <div class="box">
    <div class="header">
      <span>{{ props.data[props.id] }}</span>
    </div>
    <div class="content"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
interface IProps {
  data: string[]
  id: number
}
const props = defineProps<IProps>()
</script>

<style scoped lang="less">
.box {
  background-color: white;
  padding: 15px;
  box-shadow: 1px 1px 5px #bebebe;
  margin-bottom: 10px;
  .header {
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
    padding-top: 5px;
  }
  .content {
    padding-top: 10px;
  }
}
.box:hover {
  box-shadow: 2px 5px 5px #bebebe;
  transition: all 0.2s;
}
</style>
