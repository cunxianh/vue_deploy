<template>
    <div class="input-group">
        <input v-model="newTodo" @keyup.enter="handleAdd" placeholder="輸入待辦事項，按 Enter 新增" type="text" />
        <button @click="handleAdd" :disabled="!newTodo.trim()">
            新增
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
    (e: 'add', text: string): void
}>()


const newTodo = ref('')

const handleAdd = async (): Promise<void> => {
  const trimmed = newTodo.value.trim();
  if (!trimmed) return;

  try {
    // 假設 emit 會觸發一個 async addTodo
    await emit('add', trimmed); 
    newTodo.value = '';
  } catch (error: any) {
    console.error('Add todo failed:', error);
    alert('新增失敗，請確認輸入內容'); // 提醒使用者
  }
};
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