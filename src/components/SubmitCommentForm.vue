<script setup lang="ts">
import { ref, computed, type PropType } from 'vue'
import { usePocketBase, type PostRecord } from '@/stores/usePocketbase'

const props = defineProps({
  post: {
    type: Object as PropType<PostRecord>,
    required: true,
  },
})

const emits = defineEmits(['submitted'])

const pbStore = usePocketBase()
const commentContent = ref('')
const currentUser = computed(() => pbStore.currentUser)

async function submitPost() {
  const comment = await pbStore.createComment(props.post, commentContent.value)
  commentContent.value = '' // Clear the input field after submission
  emits('submitted', { post: props.post, comment })
}
</script>

<template>
  <!-- SubmitPostForm -->
  <div class="flex items-center space-x-2 rounded-lg">
    <img
      :src="pbStore.getAvatarUrl(currentUser)"
      alt="User Avatar"
      class="h-6 w-6 rounded-full"
    />

    <div class="text-nowrap text-sm font-medium text-gray-800">
      {{ currentUser?.name }}
    </div>

    <!-- 投稿入力ボックス -->
    <textarea
      v-model="commentContent"
      class="my-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Reply to comment..."
      rows="1.2"
    ></textarea>

    <!-- 投稿ボタン -->
    <button
      class="justify-end rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
      type="button"
      @click="submitPost"
    >
      Comment
    </button>
  </div>
</template>
