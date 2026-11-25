import { useReportListView } from '../judge/useJudgeReport'

type Props = {
  error: Error
}

export function ErrorView({ error }: Props) {
  // 判定用の記録(見た目を差し替えるときも残す)
  useReportListView('error')

  return (
    <div className="status-view status-error" role="alert">
      <p>データの取得に失敗しました。</p>
      <p className="status-detail">{error.message}</p>
    </div>
  )
}
