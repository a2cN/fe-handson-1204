// 表示用の部品から、判定に使う出来事を記録するフック(編集しなくてよい)。
// 課題のページ(基準パスが '')の一覧(/)で起きたことだけを記録する。

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { apiStore } from '../api/client'
import { useScopeBase } from '../components/scopeBase'
import { judgeEvents } from './events'
import { findListQueries, hasListData } from './inspect'

/** LoadingView / ErrorView から呼ぶ */
export function useReportListView(kind: 'loading' | 'error') {
  const base = useScopeBase()
  const { pathname } = useLocation()

  useEffect(() => {
    if (base !== '' || pathname !== '/') return
    const lists = findListQueries(judgeEvents.keywords())
    if (kind === 'loading' && lists.some((q) => q.state.status === 'pending')) {
      judgeEvents.record('list-loading-shown')
    }
    if (kind === 'error' && lists.some((q) => q.state.status === 'error')) {
      judgeEvents.record('list-error-shown')
    }
  }, [base, pathname, kind])
}

/** 検索フォームから呼ぶ。課題のページで検索したキーワードを記録する */
export function useReportSearch() {
  const base = useScopeBase()
  return (keyword: string) => {
    if (base === '') judgeEvents.recordKeyword(keyword)
  }
}

/** MissionScope から呼ぶ。詳細から一覧に戻ったとき、一覧のリクエストが出なかったかを記録する */
export function useReportReturnToList() {
  const { pathname } = useLocation()
  const prev = useRef(pathname)
  // 一覧から詳細へ移った時刻。詳細にいる間は一覧の取得(GET /products)は出ないので、
  // これ以降に GET /products があれば「戻ったときに再取得した」とみなせる。
  // (戻った時刻を基準にすると、子の一覧ページの effect が先に動いて再取得を見逃すことがある)
  const leftListAt = useRef<Date | null>(null)

  useEffect(() => {
    const from = prev.current
    prev.current = pathname
    const isDetail = (path: string) => /^\/products\/\d+$/.test(path)

    if (from === '/' && isDetail(pathname)) {
      leftListAt.current = new Date()
      return
    }
    if (pathname !== '/' || !isDetail(from) || !leftListAt.current) return

    const since = leftListAt.current
    // 再取得が始まるなら、戻った直後にリクエストが記録される。少し待ってから確かめる
    const timer = setTimeout(() => {
      const refetched = apiStore
        .getSnapshot()
        .requests.some((r) => r.method === 'GET' && r.path === '/products' && r.startedAt >= since)
      if (!refetched && hasListData(judgeEvents.keywords())) {
        judgeEvents.record('list-returned-without-refetch')
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [pathname])
}
