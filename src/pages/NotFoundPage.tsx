import { Link } from 'react-router'

// 定義されていない URL を開いたときのページ。
// 解答例の URL を打ち間違えたときに、真っ白にならないようにする。
export function NotFoundPage() {
  return (
    <div className="status-view">
      <p>このページはありません。URL を確認してください。</p>
      <p className="status-detail">
        解答例の URL: /answers/mission1、/answers/mission2、/answers/advanced
      </p>
      <Link to="/" className="back-link">
        課題の一覧へ
      </Link>
    </div>
  )
}
