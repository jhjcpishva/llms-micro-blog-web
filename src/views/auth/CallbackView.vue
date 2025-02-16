<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { authCollect } from '@/api/llms'
import { useSessionStore } from '@/stores/session'

const [route, router] = [useRoute(), useRouter()]
const sessionStore = useSessionStore()

const debug = ref('')

onMounted(async () => {
  const { nonce, success: code } = route.query

  const { response, error } = await authCollect(code as string)
  if (error) {
    debug.value = JSON.stringify(error)
    console.error(error)
    return
  }
  sessionStore.updateSessionId(response!.session)
  await sessionStore.fetchSession()

  const from = sessionStorage.getItem(nonce as string)
  sessionStorage.removeItem(nonce as string)
  const next = from ? { path: from } : { path: '/' }
  router.replace(next)
})
</script>

<template>
  <main>
    login callback.
    <div>
      if you are seeing this message, maybe login failed?:
      <pre>{{ debug }}</pre>
    </div>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
    </ul>
  </main>
</template>
