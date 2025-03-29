<template>
  <el-form
    label-width="55px"
    style="max-width: 600px"
    size="large"
    :model="account"
    :label-position="labelPosition"
    :rules="accountRules"
    status-icon
    ref="formRef"
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
import { ElNotification } from 'element-plus'
import type { FormProps, FormRules, FormInstance } from 'element-plus'
// 表格格式设置
const labelPosition = ref<FormProps['labelPosition']>('right')

// 规则校验设置
const account = reactive({
  name: '',
  password: '',
})
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' }, //是否应该输入类型
    { min: 6, max: 20, message: '账号应该为六到二十位字母或者数字', trigger: 'change' }, //长度限制类型
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码应该为六到二十位字母或者数字', trigger: 'change' },
  ],
})

// 处理函数封装并暴露给小页面组件中调用
const handleAccountLogin = () => {
  console.log('在调用账户登录处理函数了！')
  console.log(account.name, account.password)
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('验证成功')
      ElNotification({
        title: 'Success',
        message: '登录成功',
        type: 'success',
      })
    } else {
      ElNotification({
        title: 'Error',
        message: '登录失败',
        type: 'error',
      })
    }
  })
}
defineExpose({ handleAccountLogin }) // 暴露出处理函数使得在父组件的btn按钮被点击时能被调用

// 表单提交前校验
const formRef = ref<FormInstance>() // 获得表单实例
</script>

<style scoped lang="less"></style>
