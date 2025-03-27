<template>
  <div>main</div>
  <h1>{{ counterStore.count }} --- {{ counterStore.doubleCount }}</h1>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()
counterStore.changeCounterAction(8)
</script>

<style scoped lang="less"></style>
