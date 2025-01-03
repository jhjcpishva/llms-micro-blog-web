<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  once: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['intersection'])

const observeElement = ref(null as HTMLElement | null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!observeElement.value) {
    return
  }

  observer = new IntersectionObserver(handleIntersection)
  observer.observe(observeElement.value)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})

function handleIntersection(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return
    }

    emits('intersection')
    props.once && observer!.unobserve(entry.target)
  })
}
</script>

<template>
  <div ref="observeElement" class="watched-element">
    <slot></slot>
  </div>
</template>
