<script setup lang="ts">
import { useStore } from "@/utils/store";
import { format } from "date-fns";
import {type Ref, inject, ref, watch } from "vue";
const props = defineProps<{
  title: string;
  date: number;
  completed: boolean;
}>();
const {editTask,openModal,setEditingTaskId} = useStore();
const titleClasses = ref(
  "dark:text-white text-gray-900 font-[500] text-[0.85rem]" +
    (props.completed ? "line-through opacity-75" : "")
);
const isCompleted = ref(props.completed);

watch(
  () => props.completed,
  (newVal) => {
    isCompleted.value = newVal;
    titleClasses.value =
      "dark:text-white text-gray-900 font-[500] text-[0.85rem]" +
      (newVal ? " line-through opacity-75" : "");
  },
  { immediate: true }
);

const update = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked;
  editTask(props.date, {
    title: props.title,
    completed: checked,
    date: props.date,
  });
  isCompleted.value = checked; // Güncellemeyi `editTask` çağrısından sonra yapıyoruz.
};
const openDelete = () => {
  setEditingTaskId(props.date);
  openModal("delete");
};
const openEdit = () => {
  setEditingTaskId(props.date);
  openModal("edit");
};

</script>
<template>
  <div class="flex flex-row gap-2 bg-neutral-300 rounded-lg dark:bg-[#181a1b] px-2 mt-2">
    <div class="flex items-center">
      <input
        :checked="isCompleted"
        @change="update"
        type="checkbox"
        value="true"
        class="w-7 h-7 accent-blue-600 bg-[#eeeeee] dark:bg-gray-700"
      />
    </div>

    <div class="flex flex-col items-start justify-center">
      <span :class="titleClasses">{{ title }}</span>
      <span class="dark:text-white text-gray-900 font-[300] text-[0.75rem]">{{
        format(new Date(date), "p, MM/dd/yyyy")
      }}</span>
    </div>
    <div class="mr-auto" />
    <div class="flex flex-row gap-2 p-2 items-center justify-center">
      <span
        @click="openDelete"
        class="cursor-pointer modal-btn text-red-600 dark:text-red-300 ease bg-[#eeeeee] dark:bg-[#212325] hover:bg-[#dedfe1] dark:hover:bg-[#2a2d2f] rounded-lg w-9 h-9 flex items-center justify-center"
        ><i class="fa-solid fa-trash text-[1.25rem]"></i
      ></span>
      <span
        @click="openEdit"
        class="modal-btn cursor-pointer text-blue-600 dark:text-blue-300 ease bg-[#eeeeee] dark:bg-[#212325] hover:bg-[#dedfe1] dark:hover:bg-[#2a2d2f] rounded-lg w-9 h-9 flex items-center justify-center"
        ><i class="fa-solid fa-pen text-[1.25rem]"></i
      ></span>
    </div>
  </div>
</template>
<style scoped></style>