<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import AppHeader from '@/components/AppHeader.vue'
import AppBody from '@/components/AppBody.vue'

const router = useRouter()
const sessionStore = useSessionStore()

sessionStore.fetchSession() // async
</script>

<template>
  <AppHeader />
  <header>
    <div>
      <nav>nav &gt; {{ router.currentRoute.value.name }}</nav>
      <hr />
    </div>
  </header>
  <AppBody>
    <RouterView />
  </AppBody>
</template>

<style scoped>
/*  */
</style>
