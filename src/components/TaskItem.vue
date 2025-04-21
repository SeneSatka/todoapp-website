<script setup lang="ts">
import { useStore } from "@/utils/store";
import { format } from "date-fns";
import {type Ref, inject, ref } from "vue";
const props = defineProps<{
  title: string;
  date: number;
  completed: boolean;
}>();
const {editTask,openModal} = useStore();
const titleClasses = ref(
  "dark:text-white text-gray-900 font-[500] text-[0.85rem]" +
    (props.completed ? "line-through opacity-75" : "")
);
const update = (e: Event) => {
  if ((e.target as HTMLInputElement).checked)
    titleClasses.value =
      "dark:text-white text-gray-900 font-[500] text-[0.85rem] line-through opacity-75";
  else
    titleClasses.value =
      "dark:text-white text-gray-900 font-[500] text-[0.85rem]";
  editTask(props.date, {
    title: props.title,
    completed: (e.target as HTMLInputElement).checked,
    date: props.date,
  });
};
const id: Ref<number> | undefined = inject("editingTaskId");
</script>
<template>
  <div class="flex flex-row gap-2 bg-white dark:bg-[#181a1b] px-2">
    <div class="flex items-center">
      <input
        :checked="completed"
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
        @click="openModal('delete')"
        class="cursor-pointer modal-btn text-red-600 dark:text-red-300 ease bg-[#eeeeee] dark:bg-[#212325] hover:bg-[#dedfe1] dark:hover:bg-[#2a2d2f] rounded-lg w-9 h-9 flex items-center justify-center"
        ><i class="fa-solid fa-trash text-[1.25rem]"></i
      ></span>
      <span
        @click="openModal('edit')"
        class="modal-btn cursor-pointer text-blue-600 dark:text-blue-300 ease bg-[#eeeeee] dark:bg-[#212325] hover:bg-[#dedfe1] dark:hover:bg-[#2a2d2f] rounded-lg w-9 h-9 flex items-center justify-center"
        ><i class="fa-solid fa-pen text-[1.25rem]"></i
      ></span>
    </div>
  </div>
</template>
<style scoped></style>