<template>
  <div class="header">
    <h3 class="title" style="font-size: 22px">用户列表</h3>
    <el-button type="info" style="margin-right: 36px" size="large" @click="handleCreateUser"
      >新建用户</el-button
    >
  </div>
  <div class="main">
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column type="selection" width="40px"></el-table-column>
      <el-table-column type="index" label="序号" width="70px" align="center"></el-table-column>
      <el-table-column prop="name" label="用户名" width="150px" />
      <el-table-column prop="realname" label="真实姓名" width="150px" />
      <el-table-column prop="cellphone" label="手机号码" width="150px" />
      <el-table-column prop="enable" label="状态" align="center">
        <template #default="scope">
          <el-button text :icon="scope.row.enable ? Check : Close">
            {{ scope.row.enable ? '启用' : '禁用' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间" />
      <el-table-column prop="updateAt" label="更新时间" />
      <el-table-column label="操作" align="center" width="200px">
        <template #default="scope">
          <el-button :icon="Edit" text>编辑</el-button>
          <el-button :icon="Delete" text @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 30, 40]"
      layout=" total , prev, pager, next,sizes, jumper,"
      v-if="totalCount"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { deleteOneUser } from '@/service/api/user/system/system'
import { useSystemStore } from '@/store/user_system/system'
import type { payload_userList } from '@/types/user_system_types'
import { Check, Close, Delete, Edit } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const systemStore = useSystemStore()
const { userList, totalCount } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(10)
const fetchUserList = (data: payload_userList = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset, ...data }
  systemStore.postUserList(info)
}
fetchUserList()
defineExpose({ fetchUserList })
const handleCurrentChange = () => {
  fetchUserList()
}
const handleSizeChange = () => {
  fetchUserList()
}
const handleDelete = (id: number) => {
  deleteOneUser(id).then(() => {
    fetchUserList()
  })
}
const emit = defineEmits(['handle-create'])
const handleCreateUser = () => {
  emit('handle-create')
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  .title {
    margin-left: 10px;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
