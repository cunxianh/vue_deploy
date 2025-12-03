import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)
  let count = 0

  const start = () => {
    count++
    isLoading.value = true
  }

  const stop = () => {
    count--
    if (count <= 0) {
      count = 0
      isLoading.value = false
    }
  }

  return { isLoading, start, stop }
})