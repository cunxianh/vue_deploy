<template>
  <div class="todo-page">
    <TodoApp />
    <h1>📝 我的待辦清單</h1>
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