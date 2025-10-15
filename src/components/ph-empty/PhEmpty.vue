<template>
  <div class="empty-wrapper" :style="emptyStyle">
    <el-empty :image-size="props.imageSize" :description="description" :image="imgSrc()">
      <slot></slot>
    </el-empty>
  </div>
</template>
<script lang="ts" setup>
import { computed, withDefaults } from 'vue'
/**
 * 缺省图类型映射表
 * - 注意图片要保持 png 格式
 * 类型名称 - 图片名称
 */
const EMPTY_TYPE = {
  table: 'empty-result', // 表格
  message: 'empty-message', // 没有消息
  default: 'empty-default', // 默认
  loading: 'empty-loading', // 加载中
  authFail: 'empty-auth-fail', // 授权失败
  authSuccess: 'empty-auth-success', // 授权成功
  authLoading: 'empty-auth-loading', // 授权成功
  network: 'empty-network', // 网络错误
  networkError: 'empty-network-error', // 网络异常
  network404: 'empty-network-404', // 网络404
  authority: 'empty-authority', // 没有权限
  picture: 'empty-picture', // 没有图片
  pictureError: 'empty-picture-error', // 图片异常
  track: 'empty-track', // 没有足迹
  result: 'empty-result' // 没有结果
}
const EMPTY_TIP = {
  table: '暂无数据', // 表格
  message: '暂无消息', // 消息
  loading: '数据加载中', // 加载中
  default: '暂无数据', // 默认
  authFail: '授权失败', // 授权失败
  authSuccess: '授权成功', // 授权成功
  authLoading: '授权中', // 授权中
  network: '网络错误', // 网络错误
  networkError: '网络异常', // 网络异常
  network404: '页面找不到', // 网络404
  authority: '没有权限', // 没有权限
  picture: '没有图片', // 没有图片
  pictureError: '图片异常', // 图片异常
  track: '没有足迹', // 没有足迹
  result: '没有结果' // 没有结果
}
interface Props {
  type?: string
  tip?: string
  showImage?: boolean
  imageSize?: number
  marginTop?: string
  marginBottom?: string
}
const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  tip: '',
  showImage: true,
  imageSize: 144,
  marginTop: '40px',
  marginBottom: '40px'
})
const imgSrc = () => {
  if (props.type === 'undefined') return
  const path =
    props.type === 'undefined'
      ? `./img/${EMPTY_TYPE.default}.png`
      : `./img/${EMPTY_TYPE[props.type as keyof typeof EMPTY_TYPE]}.png`
  const modules = import.meta.glob('./img/*', { eager: true }) as any
  return modules[path]?.default
}
/**
 * 描述信息
 * 传入的文字优先级比预设类型高
 * 当然也可以不传type, 利用默认插槽传入文字
 */
const description = computed(() => {
  return props.tip || EMPTY_TIP[props.type as keyof typeof EMPTY_TIP] || EMPTY_TIP.default
})
/**
 * 外框样式
 */
const emptyStyle = computed(() => {
  const style: {
    'margin-top': string
    'margin-bottom': string
  } = {
    'margin-top': '',
    'margin-bottom': ''
  }
  if (props.marginTop) {
    style['margin-top'] = props.marginTop
  }
  if (props.marginBottom) {
    style['margin-bottom'] = props.marginBottom
  }
  return style
})
</script>
<script lang="ts">
export default {
  name: 'ph-empty'
}
</script>

<style lang="scss" scoped>
@include Global.deep(el-empty) {
  line-height: 1.2;
  --el-empty-description-margin-top: 16px;
  --el-empty-bottom-margin-top: 16px;
  p {
    color: $ph-text-normal-color;
  }
}
</style>
