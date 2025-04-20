<script setup lang="ts">
import ModalContainer from './components/modal/ModalContainer.vue';
import Settings from './components/modal/Settings.vue';
import Navbar from './components/static/Navbar.vue';
</script>
<template>
<ModalContainer v-slot="{open,close}">
<Settings :open="open" :close="close"/>
</ModalContainer>
<ModalContainer v-slot="{open,close}">
asdasdsa
</ModalContainer>
<div class="dark:bg-bgDark bg-gray-300 w-screen h-screen">
    <Navbar/>
</div></template>
<style scoped></style>