<template>
  <div class="box">
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
            <AccountPannel ref="refAccount"></AccountPannel>
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
      <div v-if="flag" class="controls" ref="controls">
        <el-checkbox v-model="isKeep" label="记住密码" size="large" />
        <el-link target="_blank">忘记密码</el-link>
      </div>
      <el-button class="btn" type="info" size="large" @click="handleBtnClick">立即登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PhonePannel from './PhonePannel.vue'
import AccountPannel from './AccountPannel.vue'
import { localCache } from '@/utils/cache'

const activeName = ref('account') // 显示哪一个登录模块
const flag = ref<boolean>(true) // 是否显示保存密码
const isKeep = ref<boolean>(localCache.getCache('isKeep') ?? false) // 是否记住密码
const refAccount = ref<InstanceType<typeof AccountPannel>>() // 获得AccountPannnel构造函数的实例
watch(activeName, () => (flag.value = !flag.value))
const handleBtnClick = () => {
  if (activeName.value === 'account') {
    refAccount.value?.handleAccountLogin(isKeep.value) //调用相应组件暴露出来的方法
  } else {
  }
}
</script>

<style scoped lang="less">
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes spinN {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 580px;
  height: 580px;
  border-radius: 100%;
  box-shadow: 0 0px 100px #bebebe;
  background: radial-gradient(circle at 100px 100px, #c9fcfcd2, #ffc7c7d2);
  animation: spin 5s linear infinite;
}
.login1 {
  width: 340px;
  height: 340px;
  animation: spinN 5s linear infinite;
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
    --el-color-primary: #535353;
  }
  .btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
