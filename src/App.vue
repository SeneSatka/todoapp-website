<script setup lang="ts">
import { onMounted } from 'vue';
import Settings from './components/modal/Settings.vue';
import Navbar from './components/static/Navbar.vue';
import { useStore, type State } from './utils/store';

useStore().$subscribe(
    (_, state:State) => { 
        changed(state)
    }
);
const changed=(state: State)=>{
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
<Settings/>
</Transition>
<div id="main" class="  dark:bg-bgDark bg-gray-300  h-screen w-screen ">
    <Navbar/>
</div></template>
<style scoped></style>