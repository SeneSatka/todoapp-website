<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import Settings from './components/modal/Settings.vue';
import Navbar from './components/Navbar.vue';
import { useStore, type State, type Task } from './utils/store';
import CreateTask from './components/modal/tasks/CreateTask.vue';
import DeleteTask from './components/modal/tasks/DeleteTask.vue';
import EditTask from './components/modal/tasks/EditTask.vue';
import TaskItem from './components/TaskItem.vue';

const {openModal,$subscribe,todos} = useStore();
const tasks:Ref<Array<Task>>=ref([]);
$subscribe(
    (_, state:State) => { 
        changed(state)
    }
);
const openedModal=ref("none");
const changed=(state: State)=>{
  tasks.value = state.todos;
  openedModal.value = state.openedModal;
if(state.openedModal !== "none"){ 
    
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
<template>
 <Transition
    enter-active-class="transition duration-500 ease-out"
    leave-active-class="transition duration-500 ease-out"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
   
  >
 

  <component :is="{settings:Settings,create:CreateTask,delete:DeleteTask,edit:EditTask}[openedModal]" /></Transition>
<div id="main" class="  dark:bg-bgDark bg-gray-300  h-screen w-screen ">
    <Navbar/>
    <div>
      <div class="h-16 mx-16 py-3">
    <button
      class="modal-btn text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 p-2 rounded-lg dark:hover:bg-blue-700"
      @click="() => openModal('create')"
    >
      {{ $t("addTask") }}
    </button>
  </div>

  <div
    class="bg-[#ecedf6] dark:bg-[#202324] min-h-16 flex flex-col  p-4 rounded-lg mx-16"
  >
    <TransitionGroup
      name="task"
      tag="div"
      enter-active-class="transition duration-500 ease-out"
      leave-active-class="transition duration-500 ease-out opacity-0"
      move-class="task-move"
      v-if="tasks.length > 0"
    >
      <TaskItem
        v-for="task in tasks"
        :key="task.date"
        :completed="task.completed"
        :date="task.date"
        :title="task.title"
      />
    </TransitionGroup>
    <div
      v-else
      class="flex flex-col items-center justify-center h-full w-full  text-gray-400  font-semibold text-lg">{{ $t("empty") }}</div>
  </div>
</div>
</div>
</template>
<style scoped>
/* Animasyon için gerekli CSS */
.task-move {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.task-enter-active,
.task-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.task-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.task-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.task-leave-active {
  position: absolute; /* Silinen öğenin diğer öğeleri etkilememesi için */
  width: 100%; /* Genişliği koruyarak düzgün bir animasyon sağlar */
}
</style>