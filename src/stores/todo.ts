import { defineStore } from 'pinia'
import { ref, computed, ComputedRef, type Ref } from 'vue'

// 定義待辦事項介面
export interface TodoItem {
  id: number
  text: string
  completed: boolean
}

export const useTodoStore = defineStore('todo', () => {
  // 強型別狀態
  const todos: Ref<TodoItem[]> = ref([])
  const currentFilter: Ref<'all' | 'active' | 'completed'> = ref('all')

  // 強型別方法
  const addTodo = (text: string): void => {
    if (!text.trim()) return
    todos.value.push({
      id: Date.now(),
      text: text.trim(),
      completed: false
    })
    saveTodos()
  }

  const toggleTodo = (id: number): void => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
      saveTodos()
    }
  }

  const removeTodo = (id: number): void => {
    todos.value = todos.value.filter(t => t.id !== id)
    saveTodos()
  }

  const setFilter = (filter: 'all' | 'active' | 'completed'): void => {
    currentFilter.value = filter
  }

  // 強型別計算屬性
  const filteredTodos: ComputedRef<TodoItem[]> = computed(() => {
    switch (currentFilter.value) {
      case 'active':
        return todos.value.filter(t => !t.completed)
      case 'completed':
        return todos.value.filter(t => t.completed)
      default:
        return todos.value
    }
  })

  const completedCount: ComputedRef<number> = computed(() =>
    todos.value.filter(t => t.completed).length
  )

  // localStorage 工具方法
  const saveTodos = (): void => {
    localStorage.setItem('aqua-todos-ts', JSON.stringify(todos.value))
  }

  const loadTodos = (): void => {
    try {
      const saved = localStorage.getItem('aqua-todos-ts')
      if (saved) {
        todos.value = JSON.parse(saved) as TodoItem[]
      }
    } catch {
      console.error('載入待辦失敗')
    }
  }

  return {
    todos,
    currentFilter,
    filteredTodos,
    completedCount,
    addTodo,
    toggleTodo,
    removeTodo,
    setFilter,
    loadTodos
  }
})