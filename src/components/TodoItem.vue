<template>
    <li class="todo-item" :class="{ completed: todo.completed }">
        <input type="checkbox" :checked="todo.completed" @change.stop="handleToggle" class="checkbox" />
        <span class="todo-text">{{ todo.text }}</span>
        <button type="button" @click.stop="handleRemove" class="delete-btn">
            ×
        </button>
    </li>
</template>

<script setup>
const emit = defineEmits(['toggle', 'remove'])

const props = defineProps({
    todo: {
        type: Object,
        required: true
    }
})

const handleToggle = () => {
    emit('toggle', props.todo.id)
}

const handleRemove = () => {
    emit('remove', props.todo.id)
}
</script>

<style scoped>
.todo-item {
    display: flex;
    align-items: center;
    padding: 12px;
    margin-bottom: 8px;
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.todo-item:hover {
    border-color: #42b883;
    box-shadow: 0 2px 8px rgba(66, 184, 131, 0.15);
}

.completed {
    opacity: 0.6;
}

.completed .todo-text {
    text-decoration: line-through;
}

.checkbox {
    margin-right: 12px;
    width: 18px;
    height: 18px;
}

.todo-text {
    flex: 1;
    font-size: 16px;
}

.delete-btn {
    background: #e74c3c;
    color: white;
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: background 0.2s;
}

.delete-btn:hover {
    background: #c0392b;
}
</style>