// ハンズオン用の API クライアント。
// すべての API 呼び出しは、この apiFetch を通す。
// ここで「わざと遅延させる」「リクエスト回数を記録する」「エラーを起こす」を行う。

/** わざと入れる遅延(ミリ秒)。キャッシュの効果を体感しやすくするため。 */
export const API_DELAY_MS = 3000

export type RequestLogEntry = {
  id: number
  path: string
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

export async function apiFetch<T>(path: string): Promise<T> {
  const id = nextId++
  setState({
    ...state,
    requests: [...state.requests, { id, path, startedAt: new Date(), status: 'pending' }],
  })

  try {
    await sleep(API_DELAY_MS)
    if (state.simulateError) {
      throw new Error('サーバーでエラーが発生しました(エラー発生スイッチがオンです)')
    }
    const res = await fetch(`/api${path}`)
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

// ---- 画面のリクエストパネル用(参加者は触らなくてよい) ----

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
