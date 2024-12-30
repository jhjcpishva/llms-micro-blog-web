<script setup lang="ts"></script>

<template>
  <!-- SubmitPostForm -->
  <div class="rounded-lg bg-white p-4 shadow-md">
    <!-- 投稿入力ボックス -->
    <textarea
      class="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Write your post here..."
      rows="3"
    ></textarea>

    <!-- 投稿ボタン -->
    <div class="mt-2 flex justify-end">
      <button
        class="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        type="button"
      >
        Post
      </button>
    </div>
  </div>
</template>
