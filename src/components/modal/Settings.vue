<script setup lang="ts">
import { useStore, type State } from '@/utils/store';
import i18next from 'i18next';
import { onMounted, ref } from 'vue';

const {closeModal,setLng,setTheme}=useStore();
const isOpen=ref(false);
const lng=ref(useStore().$state.lng);
const themeIsDark=ref(useStore().$state.theme == "dark");
const theme=()=>{
    themeIsDark.value = !themeIsDark.value;
    setTheme(
       themeIsDark.value ? "dark" : "light",
      );
}
const github=()=>{
    window.open("https://github.com/SeneSatka")
}
const language=()=>{
  const select = document.getElementById("language") as HTMLInputElement;
    setLng(select.value);
    i18next.changeLanguage(select.value);
}
useStore().$subscribe(
    (_, state:State) => { 
        changed(state)
    }
);
const changed=(state: State)=>{
    isOpen.value = state.openedModal == "settings";
    themeIsDark.value = state.theme == "dark";
    lng.value = state.lng;
}
onMounted(()=>{
    changed(useStore().$state);
})
</script>
<template><div v-if="isOpen" class="absolute z-50 w-screen h-screen flex items-center justify-center">
<div class="z-50 w-96 h-auto gap-3 bg-gray-200 dark:bg-bgDark border-gray-300 dark:border-borderDark border p-4 rounded-xl flex flex-col shadow-2xl">
    <div class="flex flex-row justify-between items-center"><span class="text-xl font-bold text-gray-900 dark:text-white">{{ $t("settings.title") }}</span><button @click="closeModal"><i
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
        <div class="flex flex-row px-2 items-center">
          <label
            for="language"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {{ $t("settings.language.title") }}</label
          >
          <div class="m-auto" />
          <select
            @change="language"
            id="language"
            class="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option :selected="lng == 'en'" value="en">
              {{ $t(`settings.language.en`) }}
            </option>
            <option :selected="lng == 'tr'" value="tr">
              {{ $t(`settings.language.tr`) }}
            </option>
          </select>
        </div>
        <div class="m-auto" />
        <div id="footer">
          <span
            @click="github"
            class="underline cursor-pointer text-gray-900 dark:text-white"
            >{{ $t("settings.footer") }}</span
          >
        </div>
</div></div></template>
<style scoped></style>