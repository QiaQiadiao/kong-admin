<template>
  <div>
    <el-form
      size="large"
      :label-position="labelPosition"
      label-width="70px"
      ref="formRef"
      :model="formData"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入真实姓名" v-model="formData.realname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input placeholder="请输入电话号码" v-model="formData.cellphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select placeholder="请选择查询状态" v-model="formData.enable">
              <el-option label="开启" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
              v-model="formData.createAt"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8"> </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button size="large" :icon="RefreshRight" type="info" @click="handleReset">重置</el-button>
      <el-button size="large" :icon="Search" type="info" @click="handleQuery">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormProps, ElForm } from 'element-plus'
import { RefreshRight, Search } from '@element-plus/icons-vue'
const labelPosition = ref<FormProps['labelPosition']>('right')
const formRef = ref<InstanceType<typeof ElForm>>()
const formData = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: '',
})
const emit = defineEmits(['handle-query'])
const handleReset = () => {
  formRef.value?.resetFields()
  handleQuery()
}
const handleQuery = () => {
  if (formData.enable) formData.enable = parseInt(formData.enable) // 强行将字符串类型转化为数字类型
  emit('handle-query', formData)
}
</script>

<style scoped lang="less">
.el-form-item--large {
  padding: 0 35px;
}
.btns {
  display: flex;
  flex-direction: row-reverse;
  margin-right: 20px;
  .el-button {
    margin-right: 15px;
  }
}
</style>
