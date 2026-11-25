// ハンズオン用の API クライアント。
// すべての API 呼び出しは、この apiFetch を通す。
// ここで「わざと遅延させる」「リクエスト回数を記録する」「エラーを起こす」を行う。

/**
 * わざと入れる遅延(ミリ秒)。キャッシュの効果を体感しやすくするため。
 * 遅延がかかるのは、apiFetch に delay: true を渡した呼び出しだけ(今は商品一覧の取得のみ)。
 */
export const API_DELAY_MS = 3000

export type HttpMethod = 'GET' | 'PATCH'

export type RequestLogEntry = {
  id: number
  method: HttpMethod
  path: string
  delayed: boolean
  startedAt: Date
  status: 'pending' | 'success' | 'error'
}

type ApiState = {
  requests: RequestLogEntry[]
  simulateError: boolean
}

let state: ApiState = { requests: [], simulateError: false }
let nextId = 1
const listeners = new Set<() => void>()

function setState(next: ApiState) {
  state = next
  listeners.forEach((listener) => listener())
}

function updateRequest(id: number, status: RequestLogEntry['status']) {
  setState({
    ...state,
    requests: state.requests.map((r) => (r.id === id ? { ...r, status } : r)),
  })
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type ApiFetchOptions = {
  method?: HttpMethod
  body?: unknown
  /** true のときだけ API_DELAY_MS の遅延を入れる */
  delay?: boolean
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const method = options.method ?? 'GET'
  const delayed = options.delay ?? false
  const id = nextId++
  setState({
    ...state,
    requests: [
      ...state.requests,
      { id, method, path, delayed, startedAt: new Date(), status: 'pending' },
    ],
  })

  try {
    if (delayed) await sleep(API_DELAY_MS)
    if (state.simulateError) {
      throw new Error('サーバーでエラーが発生しました(エラー発生スイッチがオンです)')
    }
    const res = await fetch(`/api${path}`, {
      method,
      headers: options.body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    })
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
    const data = (await res.json()) as T
    updateRequest(id, 'success')
    return data
  } catch (error) {
    updateRequest(id, 'error')
    throw error
  }
}

// ---- 画面のリクエストパネル用(編集しなくてよい) ----

export const apiStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot: () => state,
  setSimulateError(value: boolean) {
    setState({ ...state, simulateError: value })
  },
  clearLog() {
    setState({ ...state, requests: [] })
  },
}
