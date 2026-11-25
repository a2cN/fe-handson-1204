import { useReportListView } from '../judge/useJudgeReport'

export function LoadingView() {
  // 判定用の記録(見た目を差し替えるときも残す)
  useReportListView('loading')

  return (
    <div className="status-view" role="status">
      読み込み中…
    </div>
  )
}
