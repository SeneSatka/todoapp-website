<script setup lang="ts">
import { useStore, type State } from '@/utils/store';
import { onMounted, ref } from 'vue';

const {closeModal}=useStore();
</script>
<template><div class="absolute z-50 w-screen h-screen flex items-center justify-center">
<div class="z-50 w-96 h-auto gap-3 bg-gray-200 dark:bg-bgDark border-gray-300 dark:border-borderDark border p-4 rounded-xl flex flex-col shadow-2xl">
    <div class="flex flex-row justify-between items-center"><span class="text-xl font-bold text-gray-900 dark:text-white">{{ $t("taskEditModal.title") }}</span><button @click="closeModal"><i
        class="fa-solid fa-xmark fa-xl dark:text-gray-300 text-gray-900 hover:text-gray-500 hover:dark:text-gray-100 duration-500 ease-in-out"
      ></i
    ></button>
</div>
    
</div></div></template>
<style scoped></style>