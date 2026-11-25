import type { Mission } from './missions'

// 「今やること」のカード。判定パネルの一番上に出す。

type Props = {
  mission: Mission | null
  index: number
  total: number
  isCleared: boolean
}

export function CurrentMission({ mission, index, total, isCleared }: Props) {
  if (!mission) {
    return (
      <section className="current-mission current-mission-done" aria-label="今やること">
        <p className="current-mission-label">ALL CLEAR!</p>
        <h2 className="current-mission-goal">すべての課題をクリアしました 🎉</h2>
        <p className="current-mission-note">
          発展3(Devtools)は判定の対象外です。src/mission/DevtoolsSetup.tsx で試してみよう。
        </p>
      </section>
    )
  }

  return (
    <section className="current-mission" aria-label="今やること">
      <p className="current-mission-label">
        今やること
        <span className="current-mission-progress">
          {index + 1} / {total}
          {mission.required ? '(必須)' : '(発展)'}
        </span>
      </p>
      <p className="current-mission-title">{mission.title}</p>
      <h2 className="current-mission-goal">{mission.goal}</h2>
      <p className="current-mission-file">
        編集するファイル: <code>{mission.file}</code>
      </p>
      {isCleared ? (
        <p className="current-mission-note">✅ この課題はクリア済みです。</p>
      ) : (
        <ol className="current-mission-steps">
          {mission.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      )}
    </section>
  )
}
