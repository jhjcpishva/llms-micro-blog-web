import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import PocketBase from 'pocketbase'
import type { FetchSessionResponse } from '@/api/llms'

interface UserRecord {
  id: string
  avatar: string | null
  created: string
  email: string
  emailVisibility: boolean
  name: string
  updated: string
  username: string
  verified: boolean
}

export interface PostRecord {
  id: string
  content: string
  user: string
  created: string
  updated: string
  expand?: {
    user?: UserRecord
  }
}

export interface CommentRecord {
  id: string
  content: string
  user: string
  post: string
  created: string
  updated: string
  expand?: {
    user?: UserRecord
  }
}

export const usePocketBase = defineStore('pocketbase', () => {
  const pb = ref(null as PocketBase | null)
  const currentUser = ref(null as UserRecord | null)
  const posts = ref([] as Array<PostRecord>)
  const comments = ref({} as { [postId: string]: Array<CommentRecord> })

  const isLoggedIn = computed(() => currentUser.value !== null)

  const getAvatarUrl = computed(() => (user?: UserRecord | null) => {
    if (!user) {
      return 'https://placehold.jp/32x32.png'
    }
    const _pb = pb?.value
    const { avatar } = user
    if (!_pb || !avatar) {
      return 'https://placehold.jp/32x32.png'
    }
    return _pb.files.getURL(user, avatar)
  })

  function init() {
    pb.value = new PocketBase(import.meta.env.VITE_PB_URL)
  }

  async function login(user_id: string): Promise<void> {
    if (!pb.value) {
      throw new Error('PocketBase not initialized')
    }
    const _pb = pb.value
    const email = `${user_id}@line.dummy`
    const password = user_id

    const res = await _pb
      .collection('users')
      .authWithPassword<UserRecord>(email, password)
    currentUser.value = res.record
  }

  async function signup(session: FetchSessionResponse): Promise<void> {
    if (!pb.value) {
      throw new Error('PocketBase not initialized')
    }
    const _pb = pb.value

    let file = null
    if (session.picture) {
      // Check if picture is provided
      const response = await fetch(session.picture)
      const blob = await response.blob()
      file = new File([blob], `${session.user_id}-picture.jpg`, {
        type: blob.type,
      })
    }

    const res = await _pb.collection('users').create<UserRecord>({
      email: `${session.user_id}@line.dummy`,
      password: session.user_id,
      passwordConfirm: session.user_id,
      username: session.user_id,
      name: session.name,
      avatar: file,
      verified: false,
    })
    currentUser.value = res
  }

  async function createPost(content: string) {
    if (!pb.value) {
      throw new Error('PocketBase not initialized')
    }
    const _pb = pb.value
    const res = await _pb.collection('posts').create<PostRecord>({
      content,
      user: currentUser.value?.id ?? '',
    })
    return res
  }

  async function fetchPosts() {
    if (!pb.value) {
      throw new Error('PocketBase not initialized')
    }
    const _pb = pb.value
    const res = await _pb.collection('posts').getFullList<PostRecord>({
      expand: 'user',
      sort: '-created',
    })
    posts.value = res
  }

  async function createComment(post: PostRecord, content: string) {
    if (!pb.value) {
      throw new Error('PocketBase not initialized')
    }
    const _pb = pb.value
    const res = await _pb.collection('comments').create<CommentRecord>({
      content,
      post: post.id,
      user: currentUser.value?.id ?? '',
    })
    return res
  }
  async function fetchComments(post_id: string) {
    if (!pb.value) {
      throw new Error('PocketBase not initialized')
    }
    const _pb = pb.value
    const res = await _pb.collection('comments').getFullList<CommentRecord>({
      filter: `post.id = "${post_id}"`,
      expand: 'user',
      sort: '-created',
      requestKey: `fetch-comments-${post_id}`, // 同時に複数リクエストが走った際にキャンセルさせないように
    })
    comments.value = {
      ...comments.value,
      [post_id]: res,
    }
  }

  return {
    pb,
    init,
    login,
    isLoggedIn,
    signup,
    currentUser,
    getAvatarUrl,
    createPost,
    fetchPosts,
    posts,
    createComment,
    fetchComments,
    comments,
  }
})
