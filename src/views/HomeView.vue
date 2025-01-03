<script setup lang="ts">
import { computed, onMounted } from 'vue'
import SubmitPostForm from '@/components/SubmitPostForm.vue'
import Post from '@/components/Post.vue'
import IntersectionObserverWrapper from '@/components/IntersectionObserverWrapper.vue'
import { useSessionStore } from '@/stores/session'
import { usePocketBase, type PostRecord } from '@/stores/usePocketbase'

const sessionStore = useSessionStore()
const hasSession = computed(() => !!sessionStore.session)
const pbStore = usePocketBase()
const isLoggedIn = computed(() => !!pbStore.isLoggedIn)
const posts = computed(() => pbStore.posts)

async function handleIntersection(arg: { post: PostRecord }) {
  const { post } = arg
  await pbStore.fetchComments(post.id)
}

async function handleSubmitted(arg: { post: PostRecord }) {
  const { post } = arg
  await pbStore.fetchPosts()
  await pbStore.fetchComments(post.id)
}

onMounted(async () => {
  if (hasSession.value && !isLoggedIn.value) {
    await pbStore.login(sessionStore.session!.user_id)
  }
  if (isLoggedIn.value) {
    await pbStore.fetchPosts()
  }
})
</script>

<template>
  <div v-if="!hasSession" class="x-no-session">Please Login</div>
  <div v-else>
    <div class="x-submit-form bg-white">
      <div class="x-make-post">
        <span class="p-4 text-lg font-bold text-gray-800">Make Post...</span>
        <SubmitPostForm @submitted="handleSubmitted" />
      </div>
    </div>
    <div class="x-timeline mt-8">
      <IntersectionObserverWrapper
        v-for="post in posts"
        :key="post.id"
        @intersection="() => handleIntersection({ post })"
      >
        <Post :post="post" />
      </IntersectionObserverWrapper>
    </div>
  </div>
</template>

<style scoped>
.link {
  @apply text-blue-600 hover:bg-gray-200 hover:underline;
}
</style>
