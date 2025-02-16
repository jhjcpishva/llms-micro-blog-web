<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import AppHeader from '@/components/AppHeader.vue'
import AppBody from '@/components/AppBody.vue'

const sessionStore = useSessionStore()

sessionStore.fetchSession() // async
</script>

<template>
  <AppHeader />
  <AppBody>
    <RouterView />
  </AppBody>
</template>
