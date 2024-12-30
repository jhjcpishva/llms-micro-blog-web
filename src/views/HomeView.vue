<script setup lang="ts">
import { computed } from 'vue'
import SubmitPostForm from '@/components/SubmitPostForm.vue'
import Post from '@/components/Post.vue'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()
const hasSession = computed(() => !!sessionStore.session)
</script>

<template>
  <div v-if="!hasSession" class="x-no-session">Please Login</div>
  <div v-else>
    <div class="x-submit-form bg-white">
      <div class="x-make-post">
        <span class="p-4 text-lg font-bold text-gray-800">Make Post...</span>
        <SubmitPostForm />
      </div>
    </div>
    <div class="x-timeline mt-8">
      <Post />
    </div>
  </div>
</template>

<style scoped>
.link {
  @apply text-blue-600 hover:bg-gray-200 hover:underline;
}
</style>
