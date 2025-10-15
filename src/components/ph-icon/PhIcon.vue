<template>
  <svg v-if="iconSvg" :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
  <i
    v-else-if="props.next"
    class="ph-icon-font"
    :class="[{ disabled: disabled }, props.type]"
    v-bind="$attrs"
  ></i>
  <i v-else class="phicon" :class="[{ disabled: disabled }, props.type]" v-bind="$attrs"></i>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ph-icon'
})
const props = defineProps<{
  next?: boolean
  iconSvg?: boolean
  type: string
  color?: string
  className?: string
  disabled?: boolean
}>()

/**
 * 图标在 iconfont 中的名字
 */
const iconClassName = computed(() => {
  return `#${props.type}`
})

/**
 * 给图标添加上类名
 */
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})
</script>

<style lang="scss" scoped>
.ph-icon-font {
  font-size: 16px;
  font-family: 'ph-iconfont';
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.svg-icon {
  width: 16px;
  height: 16px;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
  &:focus {
    outline: none;
  }
}
.disabled {
  color: $ph-text-disabled-color !important;
  cursor: not-allowed !important;
}
</style>
