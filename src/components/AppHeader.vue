<script setup lang="ts">
import { computed, watch } from 'vue'
import { usePocketBase } from '@/stores/usePocketbase'

import { RouterLink } from 'vue-router'

const pbStore = usePocketBase()

const user = computed(() => pbStore.currentUser)
</script>

<template>
  <div
    class="flex h-16 items-center justify-between bg-blue-900 px-4 text-slate-300"
  >
    <h1 class="text-xl font-bold">
      <RouterLink to="/">MicroBlog</RouterLink>
    </h1>
    <div v-if="!user" class="flex h-full items-center gap-2">
      <RouterLink
        :to="{ name: 'login' }"
        class="flex h-full items-center rounded px-1 font-bold hover:bg-blue-500"
        >Login</RouterLink
      >
    </div>
    <div v-else class="flex h-full items-center gap-2">
      <span class="font-bold">{{ user.name }}</span>
      <img
        :src="pbStore.getAvatarUrl(user)"
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
