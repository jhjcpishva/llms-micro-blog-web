<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TheWelcome from '@/components/TheWelcome.vue'
</script>

<template>
  <main>
    <h1>HomeView</h1>
    <h2>TheWelcome</h2>
    <TheWelcome />
    <h2>Pages</h2>
    <ul>
      <li class="pl-4">
        <RouterLink class="link" to="/">Home</RouterLink>
      </li>
      <li class="pl-4">
        <RouterLink class="link" :to="{ name: 'login' }">Login</RouterLink>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.link {
  @apply text-blue-600 hover:bg-gray-200 hover:underline;
}
</style>
