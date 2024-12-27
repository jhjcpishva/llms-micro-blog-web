interface BaseResponse<T> {
  status: number
  error?: any
  response?: T
}

async function buildBaseResponse(res: Response) {
  const { status } = res
  const response = status === 200 ? await res.json() : undefined
  const error =
    status >= 400 && status < 500
      ? await res.json()
      : status >= 500
        ? await res.text()
        : undefined // 200 OK
  return {
    status,
    response,
    error,
  }
}

interface AuthCollectResponse {
  session: string
}

export async function authCollect(
  code: string,
): Promise<BaseResponse<AuthCollectResponse>> {
  const res = await fetch('/llms/api/v1/auth/collect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })

  return await buildBaseResponse(res)
}

export interface FetchSessionResponse {
  name: string
  user_id: string
  picture?: string
  expireAt: string
  shouldRefreshToken: boolean
}
export async function fetchSession(
  sessionId: string,
): Promise<BaseResponse<FetchSessionResponse>> {
  const res = await fetch(`/llms/api/v1/sessions/${sessionId}/`)
  return await buildBaseResponse(res)
}
