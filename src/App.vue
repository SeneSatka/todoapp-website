<script setup lang="ts">
import Settings from './components/modal/Settings.vue';
import Navbar from './components/static/Navbar.vue';
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