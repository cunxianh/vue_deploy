<template>
  <div class="todo-page">
    
    <h1>🌟 Aqua 的真實 Vue 3 待辦清單</h1>
    <TodoApp />
  </div>
</template>

<script setup>
import TodoApp from '../../App.vue'
</script>

<style scoped>
.todo-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>