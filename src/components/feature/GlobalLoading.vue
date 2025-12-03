
<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="loadingStore.isLoading"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div class="text-center">
                    <div
                        class="w-20 h-20 rounded-full border-8 border-pink-300 border-t-transparent animate-spin mx-auto">
                    </div>
                    <p class="text-pink-200 mt-6 text-lg animate-pulse">
                        努力載入中～
                    </p>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>

import { useLoadingStore } from '@/stores/loading'
const loadingStore = useLoadingStore()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>