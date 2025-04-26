<template>
  <div class="login">
    <LoginPannel></LoginPannel>
  </div>
</template>

<script setup lang="ts">
import LoginPannel from './components/LoginPannel.vue'
</script>

<style scoped lang="less">
.login {
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url(/src/assets/img/subtle-stripes.svg);
}
</style>
