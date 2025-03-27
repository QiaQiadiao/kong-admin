import { defineStore } from 'pinia'

// 组合式写法：
// const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const counter = () => {
//     count.value++
//   }
//   return {
//     count,
//     counter,
//   }
// })

// 选项式写法：
const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    changeCounterAction(newCounter: number) {
      this.count = newCounter
    },
  },
})
export default useCounterStore
