// src/stores/todo.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TodoItem } from '../shared/types'  // 注意路徑
import API from '@/api/API'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<TodoItem[]>([])
  const loading = ref(false)
  const currentFilter = ref<'all' | 'active' | 'completed'>('all') // ✅ 新增

  const setFilter = (filter: 'all' | 'active' | 'completed') => {
    currentFilter.value = filter
  }

  // ✅ 新增計算屬性
  const filteredTodos = computed(() => {
    switch (currentFilter.value) {
      case 'active': return todos.value.filter(t => !t.completed)
      case 'completed': return todos.value.filter(t => t.completed)
      default: return todos.value
    }
  })

  const completedCount = computed(() => 
    todos.value.filter(t => t.completed).length
  )


  // ✅ 改名為 loadTodos，方便在 onMounted 呼叫
  const loadTodos = async () => {
    loading.value = true
    try {
      const res = await API.get(`api/todos`)
      
      todos.value = await res.data
    } catch (error) {
      console.error('載入待辦失敗:', error)
    } finally {
      loading.value = false
    }
  }

  const addTodo = async (text: string) => {
    try {
      const res = await API.post(`api/todos`, {text})
      const newTodo = await res.data

      todos.value.push(newTodo)
    } catch (error) {
      console.error('新增失敗:', error)
    }
  }

  const toggleTodo = async (id: number) => {
    try {
      await API.patch(`api/todos/${id}/toggle`)
      await loadTodos()  // 重新載入最新資料
    } catch (error) {
      console.error('切換失敗:', error)
    }
  }

  const removeTodo = async (id: String) => {
    try {
      await API.delete(`api/todos/${id}`)
      todos.value = todos.value.filter(t => t.id !== id)
    } catch (error) {
      console.error('刪除失敗:', error)
    }
  }

  // 初始化載入
  loadTodos()

  return { 
    todos, 
    loading, 
    addTodo, 
    toggleTodo, 
    removeTodo, 
    loadTodos,
    currentFilter,
    setFilter,
    filteredTodos,
    completedCount  // ✅ 一定要 return 出去！
  }
})