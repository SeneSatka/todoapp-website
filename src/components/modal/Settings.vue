<script setup lang="ts">
import { useStore } from '@/utils/store';
import { onMounted, ref } from 'vue';

const isOpen=ref(false);
const themeIsDark=ref(false);
const theme=()=>{
    themeIsDark.value = !themeIsDark.value;
    useStore().setTheme(
       themeIsDark.value ? "dark" : "light",
      );
}
const {closeSetting}=useStore();
useStore().$subscribe(
    (_, state) => { 
        changed(state)
    }
);
const changed=(state: { isSettingsOpen: boolean; theme: string; lng: string; })=>{
    isOpen.value = state.isSettingsOpen;
if(state.isSettingsOpen) {
    
    const body = document.getElementById("main");
  if (body) {
    
    body.classList.add("overflow-hidden", "blur-sm","pointer-events-none","select-none");
    body.style.webkitFilter = "blur(2px)";
    
    
  }
    } else {
        const body = document.getElementById("main");
  if (body) {

    body.classList.remove("overflow-hidden", "blur-sm","pointer-events-none","select-none");
    body.style.webkitFilter = "none";
   
  }

    }
}
onMounted(()=>{
    changed(useStore().$state);
})
</script>
<template><div v-if="isOpen" class="absolute z-50 w-screen h-screen flex items-center justify-center">
<div class="z-50 w-96 h-auto gap-3 bg-gray-200 dark:bg-bgDark border-gray-300 dark:border-borderDark border p-4 rounded-xl flex flex-col shadow-2xl">
    <div class="flex flex-row justify-between items-center"><span class="text-xl font-bold text-gray-900 dark:text-white">{{ $t("settings.title") }}</span><button @click="closeSetting"><i
        class="fa-solid fa-xmark fa-xl dark:text-gray-300 text-gray-900 hover:text-gray-500 hover:dark:text-gray-100 duration-500 ease-in-out"
      ></i
    ></button></div>
    <label class="inline-flex items-center cursor-pointer px-2">
          <span
            class="mr-3 text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("settings.darkTheme") }}</span
          >
          <div class="m-auto" />
          <input
            type="checkbox"
            value=""
            id="themeCheckbox"
            class="sr-only peer"
            @change="theme"
            :checked="themeIsDark"
          />
          <div
            class="relative w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
        </label>

</div></div></template>
<style scoped></style>