<script setup lang="ts">
import { useStore } from '@/utils/store';

</script>
<template><div
    class="h-14 bg-gray-300 dark:bg-bgDark flex items-center p-4 border-b-gray-400 dark:border-b-borderDark border-b"
  >
    <img src="/to-do-list.png" class="w-8 h-8 mr-3" />
    <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ $t("nav.title") }}</span>
    <div class="m-auto" />
    <span class="cursor-pointer" id="settings-btn" @click="() => useStore().openModal('settings')"
      ><i
        class="fa-solid fa-gear fa-2xl dark:text-gray-300 text-gray-900 hover:text-gray-500 hover:dark:text-gray-100 duration-500 ease-in-out"
      ></i
    ></span>
  </div></template>
<style scoped></style>