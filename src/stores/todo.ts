// src/stores/todo.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TodoItem } from '../shared/types'  // 注意路徑

const API_BASE = import.meta.env.VITE_token  // ✅ 修正埠號


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
      const res = await fetch(`${API_BASE}/todos`)
      if (!res.ok) throw new Error('Failed to fetch')
      todos.value = await res.json()
    } catch (error) {
      console.error('載入待辦失敗:', error)
    } finally {
      loading.value = false
    }
  }

  const addTodo = async (text: string) => {
    try {
      const res = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const newTodo = await res.json()
      todos.value.push(newTodo)
    } catch (error) {
      console.error('新增失敗:', error)
    }
  }

  const toggleTodo = async (id: number) => {
    try {
      await fetch(`${API_BASE}/todos/${id}/toggle`, { method: 'PATCH' })
      await loadTodos()  // 重新載入最新資料
    } catch (error) {
      console.error('切換失敗:', error)
    }
  }

  const removeTodo = async (id: number) => {
    try {
      await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' })
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