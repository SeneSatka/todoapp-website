<script setup lang="ts">
import { ref } from 'vue';


const isOpened = ref(false);
const open =()=>{
    isOpened.value = true;   
}
const close =()=>{
    isOpened.value = false;
}
</script>
<template><div v-if="isOpened">
    <slot :open="open" :close="close"></slot>
</div></template>
<style scoped></style>