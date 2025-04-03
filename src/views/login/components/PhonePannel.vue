<template>
  <el-form
    :label-position="labelPosition"
    size="large"
    label-width="65px"
    style="max-width: 600px"
    :rules="phoneRules"
    :model="formValue"
    ref="formRef"
  >
    <el-form-item label="手机号" prop="phone">
      <el-input placeholder="请输入手机号码" v-model="formValue.phone" />
    </el-form-item>
    <el-form-item label="验证码" prop="validationCode">
      <el-input placeholder="输入验证码" v-model="formValue.validationCode">
        <template #suffix>
          <span id="suffixspan1">
            <span>|</span>
            <span
              id="suffixspan2"
              ref="spanRef"
              @click="handleSendValiCode"
              style="color: #000000"
              >{{ content }}</span
            >
          </span>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <el-checkbox style="margin-top: 20px" size="small" v-model="checkAgree">
    我已阅读并同意<a href="#" style="color: #000000">《模型服务协议》</a>和<a
      href="#"
      style="color: #000000"
      >《用户隐式协议》</a
    ></el-checkbox
  >
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormProps, FormRules } from 'element-plus'
const formValue = ref({
  phone: '',
  validationCode: '',
})
const labelPosition = ref<FormProps['labelPosition']>('right')
const phoneRules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' }, //是否应该输入类型
    { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }, //长度限制类型
  ],
  validationCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '密码应该为六位数字', trigger: 'blur' },
  ],
})
const content = ref<string>('点击发送验证码')
const spanRef = ref<HTMLSpanElement>()
const formRef = ref<FormInstance>()
const checkAgree = ref<boolean>(false)
const handleSendValiCode = () => {
  if (!checkAgree.value) {
    ElNotification({
      title: '发送验证码失败',
      message: '请勾选同意协议',
      type: 'error',
    })
    return
  }
  formRef
    .value!.validateField('phone')
    .then(() => {
      if (!content.value.endsWith('发送验证码')) return
      ElNotification({
        title: '发送验证码成功',
        type: 'success',
      })
      content.value = '60秒后重新发送'
      spanRef.value!.style = 'color:#aeb1b7;'
      const countDown = ref<number>(60) // 倒计时
      const temp = setInterval(() => {
        countDown.value--
        content.value = countDown.value + '秒后重新发送'
        if (!countDown.value) {
          clearInterval(temp)
          spanRef.value!.style = 'color: #1764FF;' // 颜色变蓝
          content.value = '重新发送验证码'
          countDown.value = 60
        }
      }, 1000)
    })
    .catch(() => {
      ElNotification({
        title: '发送验证码失败',
        message: '请输入正确手机号码',
        type: 'error',
      })
    })
}
</script>

<style scoped lang="less">
#suffixspan1 {
  font-size: 13px;
  #suffixspan2 {
    margin-left: 5px;
  }
}
</style>
