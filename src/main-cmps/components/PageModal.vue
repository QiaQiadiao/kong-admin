<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="isNew ? modalConfig.header.createName : modalConfig.header.editName"
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
      <template v-for="item in modalConfig.formItems" :key="item.prop">
        <template v-if="item.type === 'select'">
          <el-form-item :label="item.label">
            <el-select v-model="formData[item.prop]" :placeholder="item.placeholder">
              <template v-for="option in item.options()" :key="option.id">
                <el-option :label="option.name" :value="option.id" />
              </template>
            </el-select>
          </el-form-item>
        </template>
        <template v-else-if="item.type === 'slot'">
          <slot :name="item.slotName"> </slot>
        </template>
        <template v-else>
          <el-form-item :label="item.label">
            <el-input v-model="formData[item.prop]" :placeholder="item.placeholder"></el-input>
          </el-form-item>
        </template>
      </template>
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
import { useSystemStore } from '@/store/system/system'
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'

// 接收配置文件
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      createName: string
      editName: string
    }
    formItems: []
  }
  otherInfo?: unknown
}
const props = defineProps<IProps>()

// 初始化表格
const initialForm: unknown = {}
for (const item of props.modalConfig.formItems) {
  if (item.prop) initialForm[item.prop] = item.initVal ?? ''
}
const formData = reactive(initialForm)

const centerDialogVisible = ref(false) // 是否显示模态框
const isNew = ref(true) // 是否为新建对应的模态框

// 获取角色和部门信息
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
const emit = defineEmits(['handle-new', 'handle-edit'])
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
    let newformData = formData
    if (props.otherInfo) newformData = { ...newformData, ...props.otherInfo }
    systemStore.createAction(newformData, props.modalConfig.pageName).then(() => emit('handle-new'))
  }
  handleCloseClick()
}
// 如果创建点击时是编辑用户
const handleEditUser = () => {
  let newformData = formData
  if (props.otherInfo) newformData = { ...newformData, ...props.otherInfo }
  systemStore.editAction(newformData, props.modalConfig.pageName).then(() => emit('handle-edit'))
  handleCloseClick()
}
</script>

<style scoped lang="less"></style>
