<template>
    <div class="filter-buttons">
        <button v-for="filter in filters" :key="filter.id" class="filter-btn"
            :class="{ active: currentFilter === filter.id }" @click="$emit('filter-change', filter.id)">
            {{ filter.label }}
        </button>
    </div>
</template>

<script setup>
defineProps({
    currentFilter: String
})

defineEmits(['filter-change'])

const filters = [
    { id: 'all', label: '全部' },
    { id: 'active', label: '未完成' },
    { id: 'completed', label: '已完成' }
]
</script>

<style scoped>
.filter-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin: 24px 0;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 10px 20px;
    border: 2px solid #42b883;
    background: white;
    color: #42b883;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
}

.filter-btn:hover,
.filter-btn.active {
    background: #42b883;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
}
</style>