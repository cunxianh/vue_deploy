import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  // 狀態
  const todos = ref([])
  const currentFilter = ref('all')

  // 方法
  const addTodo = (text) => {
    todos.value.push({ id: Date.now(), text, completed: false })
    saveTodos()
  }

  const toggleTodo = (id) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.completed = !todo.completed
    saveTodos()
  }

  const removeTodo = (id) => {
    todos.value = todos.value.filter(t => t.id !== id)
    saveTodos()
  }

  const setFilter = (filter) => {
    currentFilter.value = filter
  }

  // 計算屬性
  const filteredTodos = computed(() => {
    if (currentFilter.value === 'active') return todos.value.filter(t => !t.completed)
    if (currentFilter.value === 'completed') return todos.value.filter(t => t.completed)
    return todos.value
  })

  const completedCount = computed(() => todos.value.filter(t => t.completed).length)

  // localStorage
  const saveTodos = () => {
    localStorage.setItem('aqua-todos-pinia', JSON.stringify(todos.value))
  }

  // 載入資料
  const loadTodos = () => {
    const saved = localStorage.getItem('aqua-todos-pinia')
    if (saved) todos.value = JSON.parse(saved)
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