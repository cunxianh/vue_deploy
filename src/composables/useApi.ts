import { ref } from 'vue'

export interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

export const useApiTodos = () => {
  const todos = ref<TodoItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchTodos = async (): Promise<void> => {
    try {
      loading.value = true
      const response = await fetch('/api/todos')
      if (!response.ok) throw new Error('取得待辦失敗')
      todos.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知錯誤'
    } finally {
      loading.value = false
    }
  }

  const addTodo = async (text: string): Promise<void> => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      if (!response.ok) throw new Error('新增待辦失敗')
      const newTodo = await response.json()
      todos.value.unshift(newTodo)
    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知錯誤'
    }
  }

  const toggleTodo = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/todos/${id}`, { method: 'PUT' })
      if (!response.ok) throw new Error('更新待辦失敗')
      const updatedTodo = await response.json()
      const index = todos.value.findIndex(t => t.id === id)
      if (index !== -1) {
        todos.value[index] = updatedTodo
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知錯誤'
    }
  }

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('刪除待辦失敗')
      todos.value = todos.value.filter(t => t.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知錯誤'
    }
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo
  }
}