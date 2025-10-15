let BASE_URL = ''
if (import.meta.env.PROD) {
  // 如果为生产环境
  BASE_URL = 'http://localhost:3000'
} else {
  BASE_URL = 'http://localhost:5174'
}

export { BASE_URL }
export const TIMEOUT = 60*1000
