<script setup lang="ts">
import { ref, computed, type PropType } from 'vue'
import { usePocketBase, type PostRecord } from '@/stores/usePocketbase'
import { useSessionStore } from '@/stores/session'

const props = defineProps({
  post: {
    type: Object as PropType<PostRecord>,
    required: true,
  },
})

const emits = defineEmits(['submitted'])

const sessionStore = useSessionStore()
const pbStore = usePocketBase()
const commentContent = ref('')

const user = computed(() => sessionStore.session)

async function submitPost() {
  await pbStore.createComment(props.post, commentContent.value)
  commentContent.value = '' // Clear the input field after submission
  emits('submitted', props.post)
}
</script>

<template>
  <!-- SubmitPostForm -->
  <div class="flex items-center space-x-2 rounded-lg">
    <img
      :src="user?.picture || 'https://placehold.jp/32x32.png'"
      alt="User Avatar"
      class="h-6 w-6 rounded-full"
    />

    <div class="text-nowrap text-sm font-medium text-gray-800">
      {{ user?.name }}
    </div>

    <!-- 投稿入力ボックス -->
    <textarea
      v-model="commentContent"
      class="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Reply your comment here..."
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
