<template>
    <ul class="todo-list">
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @toggle="$emit('toggle', $event)"
            @remove="$emit('remove', $event)" />
    </ul>
</template>

<script setup>
import TodoItem from './TodoItem.vue'

defineProps(['todos'])
defineEmits(['toggle', 'remove'])
</script>

<style scoped>
.todo-list {
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
}
</style>