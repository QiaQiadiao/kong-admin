enum CacheType {
  Local,
  Session,
}
class Cache {
  storage: Storage
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }
  setCache(key: string, value: unknown) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  clear() {
    this.storage.clear()
  }
}
const localCache = new Cache(CacheType.Local)
const SeesionCache = new Cache(CacheType.Session)
export { localCache, SeesionCache }
