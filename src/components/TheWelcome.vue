<script setup lang="ts">
import { computed } from 'vue'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()

const session = computed(() => sessionStore.session)
</script>

<template>
  <div v-if="session">
    You are logged in as {{ session.name }}
    <img v-if="session.picture" :src="session.picture" alt="Profile Picture" width="128"/>
  </div>
  <p v-else>Please log in to continue.</p>
</template>
