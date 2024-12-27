<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const router = useRouter()
const sessionStore = useSessionStore()

sessionStore.fetchSession() // async
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>nav &gt; {{ router.currentRoute.value.name }}</nav>
      <hr />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/*  */
</style>
