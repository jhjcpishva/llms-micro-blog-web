<script setup lang="ts">
import { computed } from 'vue'
import { useSessionStore } from '@/stores/session'

import { RouterLink } from 'vue-router'

const sessionStore = useSessionStore()

const session = computed(() => sessionStore.session)
</script>

<template>
  <div
    class="flex h-16 items-center justify-between bg-blue-900 px-4 text-slate-300"
  >
    <h1 class="text-xl font-bold">
      <RouterLink to="/">My App</RouterLink>
    </h1>
    <div v-if="!session" class="flex h-full items-center gap-2">
      <RouterLink
        :to="{ name: 'login' }"
        class="flex h-full items-center rounded px-1 font-bold hover:bg-blue-500"
        >Login</RouterLink
      >
    </div>
    <div v-else class="flex h-full items-center gap-2">
      <span class="font-bold">{{ session.name }}</span>
      <img
        :src="session.picture || ''"
        alt="profile"
        class="h-8 w-8 rounded-full"
      />
      <RouterLink
        :to="{ name: 'login' }"
        class="flex h-full items-center rounded px-1 font-bold hover:bg-blue-500"
        >Logout</RouterLink
      >
    </div>
  </div>
</template>
