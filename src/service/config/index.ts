let BASE_URL = ''
if(import.meta.env.PROD){// 如果为生产环境
  BASE_URL = "https://CMS/pro"
}else{
  BASE_URL = "https://CMS/dev"
}


export {BASE_URL}
export const TIMEOUT = 5000

