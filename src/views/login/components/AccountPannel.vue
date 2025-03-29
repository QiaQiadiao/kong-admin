<template>
  <el-form label-width="50px" style="max-width: 600px" :label-position="labelPosition">
    <el-form-item label="账号">
      <el-input />
    </el-form-item>
    <el-form-item label="密码">
      <el-input show-password />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormProps } from 'element-plus'

const labelPosition = ref<FormProps['labelPosition']>('right')
</script>

<style scoped lang="less"></style>
