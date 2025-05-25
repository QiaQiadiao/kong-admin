import { useAccountLoginStore } from '@/store/login/login'

const usePermissions = (permissionId: string) => {
  const accountLoginStore = useAccountLoginStore()
  const permission = accountLoginStore.permission
  return !!permission.find((str) => str.includes(permissionId))
}
export default usePermissions
