<template>
  <div class="todo-app">
    <h1>🌟 Aqua 的真實 Vue 3 待辦清單</h1>
    <nav class="navbar">
      <router-link to="/" class="nav-link">🏠 首頁</router-link>
      <router-link to="/todo" class="nav-link">📋 待辦</router-link>
      <router-link to="/about" class="nav-link">ℹ️ 關於</router-link>
    </nav>
    <TodoInput @add="store.addTodo" />
    <TodoFilters :current-filter="store.currentFilter" @filter-change="store.setFilter" />
    <TodoList :todos="store.filteredTodos" @toggle="store.toggleTodo" @remove="store.removeTodo" />
    <div class="stats">
      總計：{{ store.todos.length }} | 已完成：{{ store.completedCount }}
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from './stores/todo'
import { onMounted } from 'vue'
import TodoInput from './components/TodoInput.vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoList from './components/TodoList.vue'


const store = useTodoStore()

onMounted(() => {
  store.loadTodos()
})
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.stats {
  margin-top: 20px;
  padding: 15px;
  background: #f0f8ff;
  border-radius: 10px;
  text-align: center;
}

.navbar {
  background: linear-gradient(135deg, #42b883, #34d058);
  padding: 1rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s;
  font-weight: 500;
}

.nav-link:hover,
.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}
</style>