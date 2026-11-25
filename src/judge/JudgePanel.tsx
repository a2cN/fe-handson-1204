import { useState, useSyncExternalStore } from 'react'
import { badgeStore } from './badges'
import { missions, type Mission } from './missions'

// バッジの列と「判定する」ボタン(参加者は触らなくてよい)。
// 判定の結果(条件のチェックリスト)は、ボタンを押したときだけ表示する。

type Result = {
  mission: Mission
  checks: { label: string; passed: boolean }[]
  cleared: boolean
}

export function JudgePanel() {
  const earned = useSyncExternalStore(badgeStore.subscribe, badgeStore.getSnapshot)
  const [results, setResults] = useState<Result[] | null>(null)
  const [newlyCleared, setNewlyCleared] = useState<string[]>([])
  const [animating, setAnimating] = useState<string[]>([])

  const judge = () => {
    const next = missions.map((mission) => {
      const checks = mission.checks.map((c) => ({ label: c.label, passed: c.passed() }))
      return { mission, checks, cleared: checks.every((c) => c.passed) }
    })
    const cleared = next
      .filter((r) => r.cleared && !earned.includes(r.mission.id))
      .map((r) => r.mission.id)
    badgeStore.add(cleared)
    setNewlyCleared(cleared)
    setResults(next)
  }

  const close = () => {
    // 閉じたときに、新しく獲得したバッジの ✅ を動かす
    setAnimating(newlyCleared)
    setResults(null)
  }

  const cards = results?.filter((r) => newlyCleared.includes(r.mission.id)) ?? []
  const remaining = results?.filter((r) => !earned.includes(r.mission.id)) ?? []

  return (
    <section className="judge-panel" aria-label="判定">
      <ul className="badges">
        {missions.map((m) => {
          const got = earned.includes(m.id)
          return (
            <li key={m.id} className={`badge ${got ? 'badge-earned' : ''}`} title={m.title}>
              <span className="badge-label">{m.badge}</span>
              {got && (
                <span
                  className={`badge-check ${animating.includes(m.id) ? 'badge-check-new' : ''}`}
                  aria-label="クリア"
                >
                  ✅
                </span>
              )}
            </li>
          )
        })}
      </ul>

      <button type="button" className="judge-button" onClick={judge}>
        判定する
      </button>
      {earned.length > 0 && (
        <button type="button" className="judge-reset" onClick={() => badgeStore.reset()}>
          バッジをリセット
        </button>
      )}

      {results && (
        <div className="judge-overlay" role="dialog" aria-modal="true" aria-label="判定の結果">
          <div className="judge-dialog">
            {cards.map((r) => (
              <article key={r.mission.id} className="clear-card">
                <p className="clear-card-label">CLEAR!</p>
                <h2>{r.mission.title}</h2>
                <ul>
                  {r.checks.map((c) => (
                    <li key={c.label}>✅ {c.label}</li>
                  ))}
                </ul>
                <p className="clear-card-learned">
                  <strong>学んだこと:</strong> {r.mission.learned}
                </p>
              </article>
            ))}

            {cards.length === 0 && <p className="judge-message">新しくクリアした課題はありません。</p>}

            {remaining.length > 0 && (
              <div className="judge-remaining">
                <h3>まだクリアしていない課題</h3>
                {remaining.map((r) => (
                  <div key={r.mission.id}>
                    <p className="judge-mission-title">{r.mission.title}</p>
                    <ul>
                      {r.checks.map((c) => (
                        <li key={c.label}>
                          {c.passed ? '✅' : '⬜'} {c.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <button type="button" onClick={close}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
