<template>
  <div>
    <el-form size="large" right label-width="70px" ref="formRef" :model="searchForm">
      <el-row>
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'select'">
                <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder">
                  <template v-for="option in item.options()" :key="option.id">
                    <el-option :label="option.name" :value="option.id"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-else-if="item.type === 'input'">
                <el-input v-bind="item" v-model="searchForm[item.prop]"></el-input>
              </template>
            </el-form-item>
          </el-col>
        </template>
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
import type { ElForm } from 'element-plus'
import { RefreshRight, Search } from '@element-plus/icons-vue'
// 接收表格配置
interface IProps {
  searchConfig: {
    formItems: unknown[]
    pageName: string
  }
}
const props = defineProps<IProps>()

// 获取表格实例
const formRef = ref<InstanceType<typeof ElForm>>()

// 初始化表格
const initialForm: unknown = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initVal ?? ''
}
const searchForm = reactive(initialForm)

// 处理按钮逻辑
const emit = defineEmits(['handle-query'])
const handleReset = () => {
  formRef.value?.resetFields()
  handleQuery()
}
const handleQuery = () => {
  if (searchForm.enable) searchForm.enable = parseInt(searchForm.enable) // 强行将字符串类型转化为数字类型
  emit('handle-query', searchForm, props.searchConfig.pageName)
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
