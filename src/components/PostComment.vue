<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import { usePocketBase } from '@/stores/usePocketbase'
import type { CommentRecord } from '@/stores/usePocketbase'

const props = defineProps({
  comment: {
    type: Object as PropType<CommentRecord>,
    required: true,
  },
})
</script>

<template>
  <div class="flex items-center">
    <img
      src="https://placehold.jp/32x32.png"
      alt="User Avatar"
      class="mr-2 h-6 w-6 rounded-full"
    />
    <div
      class="text-sm font-medium text-gray-800"
      :title="props.comment.created"
    >
      {{ props.comment.expand?.user?.name }}
    </div>
    <div class="ml-2 text-sm font-medium text-gray-500">
      {{ props.comment.content }}
    </div>
  </div>
</template>
