import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const useAccountLoginStore = defineStore('login', () => {
  const data = reactive({
    id: -1,
    name: '',
    token: '',
  })
})
