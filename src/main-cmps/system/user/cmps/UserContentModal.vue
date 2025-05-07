<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="isNew ? '新建用户' : '编辑用户'"
    width="500"
    destroy-on-close
    center
    :show-close="false"
  >
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
      <el-form-item label="密码" v-if="isNew">
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
        <el-button @click="handleCloseClick" size="large">取消</el-button>
        <el-button type="info" @click="handleUser" size="large">确认</el-button>
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
const centerDialogVisible = ref(false) // 是否显示模态框
const isNew = ref(true) // 是否为新建对应的模态框
const formData = reactive<typeUserInfo>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: '',
})
// 获取角色和部门信息
const mainStore = useMainStore()
const { entireRole, entireDepartment } = storeToRefs(mainStore)
const systemStore = useSystemStore()
const handleCloseClick = () => {
  centerDialogVisible.value = false
  for (const key in formData) {
    formData[key] = ''
  }
}

// 用来处理模态框显示状态
const setDialogVisible = (rowInfo, IsNew: boolean) => {
  isNew.value = IsNew
  if (!IsNew) {
    // 如果是编辑状态,写回点击数据项到模态框的表格中
    for (const key in rowInfo) {
      if (key === 'department') formData['departmentId'] = rowInfo[key].id
      else if (key === 'role') formData['roleId'] = rowInfo[key].id
      else formData[key] = rowInfo[key]
    }
  }
  centerDialogVisible.value = true
}
defineExpose({ setDialogVisible })

// 处理确认点击
const handleUser = () => {
  if (isNew.value) handleCreateUser()
  else handleEditUser()
}
const emit = defineEmits(['handle-new'])
// 如果确认点击时是创建用户
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
    systemStore.createOneUserAction(formData).then(() => emit('handle-new'))
  }
  handleCloseClick()
}
// 如果创建点击时是编辑用户
const handleEditUser = () => {
  // if (
  //   formData.name === '' &&
  //   formData.realname === '' &&
  //   formData.cellphone === '' &&
  //   formData.roleId === '' &&
  //   formData.departmentId === ''
  // ) {
  //   return
  // } else {
  //   const systemStore = useSystemStore()
  //   systemStore.createOneUserAction(formData).then(() => emit('handle-new'))
  // }
  systemStore.editOneUserAction(formData)
  handleCloseClick()
}
</script>

<style scoped lang="less"></style>
