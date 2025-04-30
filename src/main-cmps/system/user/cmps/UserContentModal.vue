<template>
  <el-dialog v-model="centerDialogVisible" title="新建用户" width="500" destroy-on-close center>
    <el-form
      :model="formData"
      label-position="left"
      label-width="80px"
      style="max-width: 400px; margin: 0 auto"
      size="large"
    >
      <el-form-item label="用户名">
        <el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="formData.cellphone" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item label="选择角色">
        <el-select v-model="formData.roleId" placeholder="请选择角色">
          <template v-for="item in entireRole" :key="item.id">
            <el-option :label="item.name" :value="item.id" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="选择部门">
        <el-select v-model="formData.departmentId" placeholder="请选择部门">
          <template v-for="item in entireDepartment" :key="item.id">
            <el-option :label="item.name" :value="item.id" />
          </template>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false" size="large">取消</el-button>
        <el-button type="info" @click="handleCreateUser" size="large">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
import { useSystemStore } from '@/store/system/user/system'
import type { typeUserInfo } from '@/types/user_system_types'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
const centerDialogVisible = ref(false)
const setDialogVisible = () => {
  centerDialogVisible.value = true
}
defineExpose({ setDialogVisible })
const formData = reactive<typeUserInfo>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: '',
})
const mainStore = useMainStore()
const { entireRole, entireDepartment } = storeToRefs(mainStore)
const handleCreateUser = () => {
  if (
    formData.name === '' ||
    formData.realname === '' ||
    formData.password === '' ||
    formData.cellphone === '' ||
    formData.roleId === '' ||
    formData.departmentId === ''
  ) {
    ElNotification({
      title: 'Error',
      message: '新建失败，用户信息缺失。',
      type: 'error',
    })
  } else {
    console.log('准备发射')
    const systemStore = useSystemStore()
    systemStore.createOneUserAction(formData)
    systemStore.postUserList()
  }
  centerDialogVisible.value = false
}
</script>

<style scoped lang="less"></style>
