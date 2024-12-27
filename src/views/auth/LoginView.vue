<script setup lang="ts">
//
import { useRoute, useRouter } from 'vue-router'

import { onMounted } from 'vue'

const [route, router] = [useRoute(), useRouter()]

const { BASE_URL } = import.meta.env

onMounted(() => {
  const { from } = route.query
  const nonce = `nonce-${Date.now()}-${Math.floor(Math.random() * 10000)}`
  if (from) {
    // ログイン後に戻る先を保存
    sessionStorage.setItem(nonce, from as string)
  }

  const origin = location.origin
  const baseUrl = BASE_URL.replace(/^\/|\/$/g, '')
  const routerPath = router.resolve({ name: 'callback' }).path
  const qs = {
    nonce,
    redirect_url: `${origin}/${baseUrl}${routerPath}`,
  }

  const query = Object.entries(qs)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&')

  // LLMS サービスへ繊維
  window.location.replace(`/llms/login?${query}`)
})
</script>

<template>
  <main>redirect to llms page...</main>
</template>
