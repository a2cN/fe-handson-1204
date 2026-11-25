type Props = {
  error: Error
}

export function ErrorView({ error }: Props) {
  return (
    <div className="status-view status-error" role="alert">
      <p>データの取得に失敗しました。</p>
      <p className="status-detail">{error.message}</p>
    </div>
  )
}
