import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import PocketBase from 'pocketbase'
import type { FetchSessionResponse } from '@/api/llms'

interface UserRecord {
  id: string
  avatar: string
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

  function init() {
    const _pb = (pb.value = new PocketBase('http://localhost:8090/'))
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

    const res = await _pb.collection('users').create<UserRecord>({
      email: `${session.user_id}@line.dummy`,
      password: session.user_id,
      passwordConfirm: session.user_id,
      username: session.user_id,
      name: session.name,
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

    // 画面に表示されたときで呼びたい
    await Promise.all(res.map((post) => fetchComments(post.id)))
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
    createPost,
    fetchPosts,
    posts,
    createComment,
    fetchComments,
    comments,
  }
})
