<template>
  <div class="box">
    <div class="content">
      <div class="header">
        <span>商品总销量</span>
        <el-tooltip content="商品总销量" placement="top" effect="light">
          <el-icon><Warning /></el-icon>
        </el-tooltip>
      </div>
      <h1 ref="countRef">501,112</h1>
    </div>
    <div class="footer">
      <span id="name">商品总销量</span>
      <span id="count" ref="totalRef">5092,123</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'
const totalRef = ref()
const countRef = ref()
onMounted(() => {
  const countup1 = new CountUp(totalRef.value, 521234)
  const countup2 = new CountUp(countRef.value, 521234)
  countup1.start()
  countup2.start()
})
</script>

<style scoped lang="less">
.box {
  margin-bottom: 10px;
  background-color: white;
  padding: 15px;
  box-shadow: 1px 1px 5px #bebebe;
  .content {
    border-bottom: 1px solid #ccc;
    .header {
      display: flex;
      margin-bottom: 5px;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #979799;
    }
    h1 {
      margin: 10px 0;
      font-weight: normal;
    }
  }
  .footer {
    margin-top: 10px;
    font-size: 14px;
    #count {
      margin-left: 5px;
    }
  }
}
.box:hover {
  box-shadow: 2px 5px 5px #bebebe;
  transition: all 0.2s;
}
</style>
