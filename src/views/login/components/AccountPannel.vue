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
      <el-input v-model="account.name" placeholder="请输入账号" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input show-password v-model="account.password" placeholder="请输入验证码" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import type { FormProps, FormRules, FormInstance } from 'element-plus'
import { useAccountLoginStore } from '@/store/login/login'
import type { IAccount } from '@/types/login_types'
import { localCache } from '@/utils/cache'
//常量
const NAME_CACHE = 'name'
const PASSWORD_CACHE = 'password'
const ISKEEP_CACHE = 'isKeep'
// 表格格式设置
const labelPosition = ref<FormProps['labelPosition']>('right')

// 规则校验设置
const account = reactive<IAccount>({
  name: localCache.getCache(NAME_CACHE) ?? '',
  password: localCache.getCache(PASSWORD_CACHE) ?? '',
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
const handleAccountLogin = (isKeep: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      ElNotification({
        title: 'Success',
        message: '登录成功',
        type: 'success',
      })
      const name = account.name
      const password = account.password
      const accountLoginStore = useAccountLoginStore()
      accountLoginStore.accountLogin({ name, password }).then(() => {
        if (isKeep) {
          localCache.setCache(NAME_CACHE, name)
          localCache.setCache(PASSWORD_CACHE, password)
          localCache.setCache(ISKEEP_CACHE, isKeep)
        } else {
          localCache.removeCache(NAME_CACHE)
          localCache.removeCache(PASSWORD_CACHE)
          localCache.removeCache(ISKEEP_CACHE)
        }
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
