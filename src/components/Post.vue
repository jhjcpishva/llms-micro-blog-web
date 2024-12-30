<script setup lang="ts"></script>

<template>
  <div class="mb-4 rounded-lg bg-white p-4 shadow-md">
    <!-- ユーザー情報 -->
    <div
      class="mb-1 flex items-center justify-between border-b border-gray-200 pb-1"
    >
      <div class="flex items-center">
        <img
          src="https://placehold.jp/32x32.png"
          alt="User Avatar"
          class="mr-2 h-8 w-8 rounded-full"
        />
        <div class="text-sm font-medium text-gray-800">{username}</div>
      </div>
      <div class="text-xs text-gray-500">{timestamp}</div>
    </div>

    <!-- 投稿内容 -->
    <div class="mb-4 text-4xl text-gray-700">{content}</div>

    <!-- replies  -->
    <div class="x-replies ml-8">
      <div class="flex items-center">
        <img
          src="https://placehold.jp/32x32.png"
          alt="User Avatar"
          class="mr-2 h-6 w-6 rounded-full"
        />
        <div class="text-sm font-medium text-gray-800" title="{timestamp}">
          {username}
        </div>
        <div class="ml-2 text-sm font-medium text-gray-500">{reply}</div>
      </div>
    </div>

    <!-- アクションボタン -->
    <div class="mt-4 flex space-x-4">
      <button
        class="text-sm text-blue-500 transition hover:text-blue-600"
        type="button"
      >
        Like
      </button>
      <button
        class="text-sm text-blue-500 transition hover:text-blue-600"
        type="button"
      >
        Comment
      </button>
    </div>
  </div>
</template>
