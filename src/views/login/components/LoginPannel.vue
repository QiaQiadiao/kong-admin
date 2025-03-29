<template>
  <div class="login1">
    <!-- 顶部标题 -->
    <h1 class="title">空空后台管理系统</h1>
    <!-- 切换登录方式 -->
    <div class="tab">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane label="账号登陆" name="account">
          <template #label>
            <el-icon><UserFilled /></el-icon>&nbsp; 账号登陆
          </template>
          <AccountPannel></AccountPannel>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <el-icon><Iphone /></el-icon>&nbsp; 手机登录
          </template>
          <PhonePannel></PhonePannel>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 尾部保存密码及按钮 -->
    <div class="controls">
      <el-checkbox v-model="isKeep" label="记住密码" size="large" />
      <el-link target="_blank">忘记密码</el-link>
    </div>
    <el-button class="btn" type="info" size="large" @click="handleBtnClick">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PhonePannel from './PhonePannel.vue'
import AccountPannel from './AccountPannel.vue'
const activeName = ref('account')
const isKeep = ref(false)
const handleBtnClick = () => {
  console.log(activeName.value)
}
</script>

<style scoped lang="less">
.login1 {
  width: 340px;
  height: 340px;
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  .tab {
    --el-color-primary: #535353;
  }
  .controls {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
    --el-color-primary: #535353;
  }
  .btn {
    width: 100%;
  }
}
</style>
