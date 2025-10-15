export default class YoutubeIframePlay {
  // 设置当前实例
  // eslint-disable-next-line no-use-before-define
  private static instance: YoutubeIframePlay
  constructor() {
    this.insertScript()
  }

  /**
   * 获取实例
   */
  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new YoutubeIframePlay()
    return this.instance
  }

  // 置入JS
  insertScript() {
    const ele = document.createElement('script')
    const headEle = document.getElementsByTagName('script')[0]
    ele.async = true
    ele.defer = true
    ele.src = 'https://www.youtube.com/iframe_api'
    ele.charset = 'utf-8'
    // 延迟500ms置入
    setTimeout(() => {
      headEle.parentNode && headEle.parentNode.insertBefore(ele, headEle)
    }, 600)
  }

  /**
   * 创建iframe对象
   * @param {string} dom
   * @param {*} cb
   * @return {*}
   * @memberof YoutubeIframePlay
   */
  createIframe(dom: string, cb: any): any {
    return new window.YT.Player(dom, cb)
  }
}
