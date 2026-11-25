import type { FormEvent } from 'react'
import { useReportSearch } from '../judge/useJudgeReport'

// 検索フォーム(表示専用)。送信したときだけ onSearch を呼ぶ。

type Props = {
  defaultValue: string
  onSearch: (keyword: string) => void
}

export function SearchForm({ defaultValue, onSearch }: Props) {
  // 判定用の記録(見た目を差し替えるときも残す)
  const reportSearch = useReportSearch()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = new FormData(e.currentTarget).get('keyword')
    const keyword = typeof value === 'string' ? value : ''
    reportSearch(keyword)
    onSearch(keyword)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <input
        name="keyword"
        type="search"
        defaultValue={defaultValue}
        placeholder="キーワード(例: マウス、オーディオ)"
        aria-label="キーワード"
      />
      <button type="submit">検索</button>
    </form>
  )
}
