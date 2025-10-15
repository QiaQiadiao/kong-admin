import { createI18n } from 'vue-i18n'
// import { getLocaleMessage } from '@/service/modules/service-common'
import { set } from 'lodash'
import { nextTick } from 'vue'

export type I18nType = 'zh-cn' | 'en'
const DEFAULT_LOCALE: I18nType = 'zh-cn'

export const i18n = createI18n({
  locale: DEFAULT_LOCALE,
  legacy: false,
  message: {}
})

/**
 * 异步加载语言包
 * @param locale
 */
export async function asyncSetupI18n(locale: string) {
  try {
    const { data } = await getLocaleMessage(locale)

    const message: any = {}
    ;(data?.list || []).forEach((item: any) => {
      set(message, item.languageKey, item.languageValue)
    })
    i18n.global.setLocaleMessage(locale, message)
    return nextTick()
  } catch (e) {
    console.error(e)
  }
}

/**
 * 设置语言
 * @param locale
 */
export function setI18nLanguage(locale: string) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }

  // @ts-expect-error: 需要设置 HTML 标签的语言属性
  document.querySelector('html').setAttribute('lang', locale)
}

nextTick(() => {
  asyncSetupI18n(DEFAULT_LOCALE)
})
