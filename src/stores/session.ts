import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchSession as fetchSessionApi } from '@/api/llms'
import type { FetchSessionResponse } from '@/api/llms'
import { usePocketBase } from './usePocketbase'

export const useSessionStore = defineStore('session', () => {
  const sessionId = ref(null as string | null)
  const session = ref(null as FetchSessionResponse | null)

  function loadSessionId() {
    !sessionId.value && (sessionId.value = localStorage.getItem('session'))
  }
  function updateSessionId(_session: string) {
    sessionId.value = _session
    localStorage.setItem('session', _session)

    session.value = null
  }
  async function fetchSession(): Promise<void> {
    loadSessionId()
    if (!sessionId.value) {
      session.value = null
      return
    }
    if (!session.value) {
      const { response, error } = await fetchSessionApi(sessionId.value)
      if (error) {
        console.error('', error)
        throw new Error('Error fetching session')
      }
      session.value = response!

      // ToDo: split pb login outside here
      const pb = usePocketBase()
      pb.init()
      try {
        await pb.login(response!.user_id)
      } catch (e) {
        await pb.signup(response!)
      }
    }
  }

  return { fetchSession, updateSessionId, session }
})
