<script setup lang="ts">
import { useStore, type State } from '@/utils/store';
import { onMounted, ref, type Ref } from 'vue';
const title = ref(" ");
const completed: Ref<boolean> = ref(false);
const {closeModal,addTask}=useStore();
const create = () => {
  const id = Date.now();
 addTask({
    title: title.value,
    completed: completed.value,
    date: id,
  });
  closeModal();
};
</script>
<template><div class="absolute z-50 w-screen h-screen flex items-center justify-center">
<div class="z-50 w-96 h-auto gap-3 bg-gray-200 dark:bg-bgDark border-gray-300 dark:border-borderDark border p-4 rounded-xl flex flex-col shadow-2xl">
    <div class="flex flex-row justify-between items-center">
      <span class="text-xl font-bold text-gray-900 dark:text-white">{{ $t("taskCreateModal.title") }}</span><button @click="closeModal"><i
        class="fa-solid fa-xmark fa-xl dark:text-gray-300 text-gray-900 hover:text-gray-500 hover:dark:text-gray-100 duration-500 ease-in-out"
      ></i
    ></button>
   
</div>
<div class="relative z-0 px-2">
    <input
      @keyup="
              (e) => {
                title= (e.target as HTMLInputElement).value
              }
            "
      type="text"
      id="floating_standard"
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
    />
    <label
      for="floating_standard"
      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >{{ $t("taskCreateModal.taskTitle") }}</label
    >
  </div>
  <div class="flex flex-row px-2 items-center">
    <label
      for="language"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ $t("taskCreateModal.status.title") }}</label
    >
    <div class="m-auto" />
    <select
      @change="
              (e) => {
                completed= ((e.target as HTMLInputElement).value=='true')
              }
            "
      id="status"
      class="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option :selected="!completed" value="false">
        {{ $t(`taskCreateModal.status.incomplete`) }}
      </option>
      <option :selected="completed" value="true">
        {{ $t(`taskCreateModal.status.completed`) }}
      </option>
    </select>
  </div>
  <button
    @click="create"
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    {{ $t("taskCreateModal.create") }}
  </button>
</div></div></template>
<style scoped></style>