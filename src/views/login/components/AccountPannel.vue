<template>
  <el-form
    label-width="55px"
    style="max-width: 600px"
    size="large"
    :model="account"
    :label-position="labelPosition"
    :rules="accountRules"
    status-icon
  >
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input show-password v-model="account.password" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormProps, FormRules } from 'element-plus'

const labelPosition = ref<FormProps['labelPosition']>('right')

// const ruleFormRef = ref<FormInstance>()
const account = reactive({
  name: '',
  password: '',
})
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' }, //是否应该输入类型
    { min: 6, max: 20, message: '账号位数应该为六到二十', trigger: 'change' }, //长度限制类型
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码位数应该为六到二十', trigger: 'change' },
  ],
})
</script>

<style scoped lang="less"></style>
