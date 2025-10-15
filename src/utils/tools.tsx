import { defineAsyncComponent } from 'vue'
import { ElButton } from 'element-plus'
import AsyncImportComponentLoading from '@/components/AsycImportLoading/Index.vue'
import { PhEmpty } from '@/components/ph-empty/PhEmpty.vue'
/**
 * 异步加载component
 * @param loader
 */
export const asyncImportComponent = (loader: any) => {
  return defineAsyncComponent({
    loader,
    loadingComponent: AsyncImportComponentLoading /* shows while loading */,
    errorComponent: () => {
      return (
        <PhEmpty type="networkError" tip="网络不畅, 请重试!">
          <ElButton type="primary" onClick={() => location.reload()}>
            请重试
          </ElButton>
        </PhEmpty>
      )
    } /* shows if there's an error */,
    delay: 1000 /* delay in ms before showing loading component */,
    timeout: 10000 * 6 /* timeout after this many ms */
  })
}
