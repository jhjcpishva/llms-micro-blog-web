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
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink :to="{ name: 'login' }">Login</RouterLink></li>
    </ul>
  </main>
</template>
