import { useSyncExternalStore } from 'react'
import { API_DELAY_MS, apiStore } from '../api/client'

// API リクエストの回数と履歴を表示するパネル(参加者は触らなくてよい)。

const statusLabel = {
  pending: '通信中',
  success: '成功',
  error: '失敗',
} as const

export function RequestPanel() {
  const { requests, simulateError } = useSyncExternalStore(
    apiStore.subscribe,
    apiStore.getSnapshot,
  )

  return (
    <aside className="request-panel" aria-label="API リクエスト">
      <div className="request-count">
        API リクエスト <strong>{requests.length}</strong> 回
      </div>
      <p className="request-note">遅延: {API_DELAY_MS} ms(商品一覧の取得のみ)</p>

      <label className="request-toggle">
        <input
          type="checkbox"
          checked={simulateError}
          onChange={(e) => apiStore.setSimulateError(e.target.checked)}
        />
        エラーを発生させる
      </label>

      <button type="button" onClick={() => apiStore.clearLog()}>
        履歴をクリア
      </button>

      <ol className="request-log" reversed>
        {[...requests].reverse().map((r) => (
          <li key={r.id} className={`request-${r.status}`}>
            <span>{r.startedAt.toLocaleTimeString('ja-JP')}</span>
            <code>
              {r.method} {r.path}
            </code>
            {r.delayed && <span title="遅延あり">⏱</span>}
            <span>{statusLabel[r.status]}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}
