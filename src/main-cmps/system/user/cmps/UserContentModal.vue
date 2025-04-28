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
        <el-select placeholder="请选择角色">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="选择部门">
        <el-select placeholder="请选择部门">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false" size="large">取消</el-button>
        <el-button type="info" @click="centerDialogVisible = false" size="large">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const centerDialogVisible = ref(false)
const setDialogVisible = () => {
  centerDialogVisible.value = true
}
defineExpose({ setDialogVisible })
const formData = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: '',
})
</script>

<style scoped lang="less"></style>
