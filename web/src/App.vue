<template>
  <div class="h-screen p-24">
    <h1 class="text-2xl"><router-link to="/">BrunstadTV</router-link></h1>
    <router-view/>
  </div>
</template>

<script setup>
import FrontPage from './components/FrontPage.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>