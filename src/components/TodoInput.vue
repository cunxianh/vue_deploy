<template>
    <div class="input-group">
        <input v-model="newTodo" @keyup.enter="handleAdd" placeholder="輸入待辦事項，按 Enter 新增" />
        <button @click="handleAdd" :disabled="!newTodo.trim()">
            新增
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])
const newTodo = ref('')

const handleAdd = () => {
    if (newTodo.value.trim()) {
        emit('add', newTodo.value)
        newTodo.value = ''
    }
}
</script>

<style scoped>
.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

input {
    flex: 1;
    padding: 12px;
    border: 2px solid #42b883;
    border-radius: 8px;
}

button {
    padding: 12px 24px;
    background: #42b883;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

button:disabled {
    background: #ccc;
    cursor: not-allowed;
}
</style>