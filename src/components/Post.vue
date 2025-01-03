<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import type { PropType } from 'vue'
import PostComment from './PostComment.vue'
import SubmitCommentForm from './SubmitCommentForm.vue'
import { usePocketBase } from '@/stores/usePocketbase'
import type { CommentRecord, PostRecord } from '@/stores/usePocketbase'

const pbStore = usePocketBase()

const props = defineProps({
  post: {
    type: Object as PropType<PostRecord>,
    required: true,
  },
})
const comments = computed(() => pbStore.comments[props.post.id] || [])
const user = computed(() => props.post.expand?.user)

const isCommentsDisplayed = ref(false)

async function handleCommentSubmitted(arg: {
  post: PostRecord
  comment: CommentRecord
}) {
  const { post } = arg
  // refresh comments
  await pbStore.fetchComments(post.id)
}
</script>

<template>
  <div class="mb-4 rounded-lg bg-white p-4 shadow-md">
    <!-- ユーザー情報 -->
    <div
      class="mb-1 flex items-center justify-between border-b border-gray-200 pb-1"
    >
      <div class="flex items-center">
        <img
          :src="pbStore.getAvatarUrl(user)"
          alt="User Avatar"
          class="mr-2 h-8 w-8 rounded-full"
        />
        <div class="text-sm font-medium text-gray-800">
          {{ user?.name }}
        </div>
      </div>
      <div class="text-xs text-gray-500">{{ post.created }}</div>
    </div>

    <!-- 投稿内容 -->
    <div class="mb-4 text-4xl text-gray-700">{{ post.content }}</div>

    <!-- replies  -->
    <div
      class="transition-all"
      :class="
        isCommentsDisplayed
          ? ['max-h-screen overflow-y-auto opacity-100']
          : ['max-h-0 overflow-y-hidden opacity-0']
      "
    >
      <div v-if="comments.length" class="x-comments ml-8">
        <PostComment
          v-for="comment in comments"
          :comment="comment"
          :key="comment.id"
        />
      </div>

      <div class="ml-8">
        <SubmitCommentForm :post="post" @submitted="handleCommentSubmitted" />
      </div>
    </div>

    <!-- アクションボタン -->
    <div class="mt-4 flex space-x-2">
      <button class="action-btn" type="button" disabled>Like</button>
      <button
        class="action-btn"
        :class="{ active: isCommentsDisplayed }"
        type="button"
        @click="isCommentsDisplayed = !isCommentsDisplayed"
      >
        Comments ({{ comments.length }})
      </button>
    </div>
  </div>
</template>

<style scoped>
.action-btn {
  @apply px-2 text-sm text-blue-500 transition hover:rounded-md hover:bg-blue-200 hover:text-blue-600 disabled:text-gray-400 disabled:hover:bg-transparent;
}
.action-btn.active {
  @apply rounded-md bg-blue-500 text-white hover:bg-blue-400;
}
</style>
