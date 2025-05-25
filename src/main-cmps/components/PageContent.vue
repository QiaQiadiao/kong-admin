<template>
  <div class="header">
    <h3 class="title" style="font-size: 22px">
      {{ contentConfig.header?.titleName ?? '数据列表' }}
    </h3>
    <el-button
      v-if="isCreate"
      type="info"
      style="margin-right: 36px"
      size="large"
      @click="handleCreateUser"
      >{{ contentConfig.header?.createBtnName ?? '新建数据' }}</el-button
    >
  </div>
  <div class="main">
    <el-table :data="pageList" stripe style="width: 100%" v-bind="contentConfig.childrenTree">
      <el-table-column type="selection" width="40px"></el-table-column>
      <el-table-column type="index" label="序号" width="70px" align="center"></el-table-column>
      <template v-for="coloum in contentConfig.propsList" :key="coloum.prop">
        <template v-if="coloum.prop === 'handler'">
          <el-table-column v-bind="coloum">
            <template #default="scope">
              <el-button v-if="isEdit" :icon="Edit" text @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button v-if="isDelete" :icon="Delete" text @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column v-bind="coloum"></el-table-column>
        </template>
      </template>
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
import usePermissions from '@/hooks/usePermissions'
import { useSystemStore } from '@/store/system/system'
import { Delete, Edit } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
// 接收父组件配置数据
interface IProps {
  contentConfig: {
    header?: {
      titleName: string
      createBtnName: string
    }
    propsList: []
    pageName: string
    childrenTree?: {
      rowKey: string
      treeProps: {
        children: string
        hasChildren?: string
      }
    }
  }
}
const props = defineProps<IProps>()
const systemStore = useSystemStore()
const { pageList, totalCount } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(10)
const fetchPageList = () => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  systemStore.postPageList(info, props.contentConfig.pageName)
}
fetchPageList()
defineExpose({ fetchPageList, currentPage, pageSize })
const handleCurrentChange = () => {
  fetchPageList()
}
const handleSizeChange = () => {
  fetchPageList()
}
const handleDelete = (id: number) => {
  systemStore.deletAction(id, props.contentConfig.pageName)
}
const emit = defineEmits(['handle-create', 'handle-edit'])
const handleCreateUser = () => {
  emit('handle-create', true)
}
const handleEdit = (rowInfo) => {
  emit('handle-edit', rowInfo, false)
}
// 权限设置
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isEdit = usePermissions(`${props.contentConfig.pageName}:edit`)
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
