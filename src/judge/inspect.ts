// 課題用のキャッシュ(src/lib/queryClient.ts)と API の履歴を調べる関数。
// 解答例は別の QueryClient を使うので、ここには混ざらない。

import type { Query } from '@tanstack/react-query'
import { apiStore } from '../api/client'
import { queryClient } from '../lib/queryClient'

const keyText = (query: Query) => JSON.stringify(query.queryKey)

/** 検索用のキャッシュか(キーに 'search' を含むか、検索したキーワードを含むか) */
function isSearchQuery(query: Query, keywords: string[]) {
  const text = keyText(query)
  return text.includes('search') || keywords.some((k) => text.includes(k))
}

/** 商品一覧のキャッシュ(検索以外で、配列を持つ、または持とうとしているもの) */
export function findListQueries(keywords: string[] = []) {
  return queryClient
    .getQueryCache()
    .getAll()
    .filter((q) => !isSearchQuery(q, keywords))
    .filter((q) => q.state.data === undefined || Array.isArray(q.state.data))
}

export function hasListData(keywords: string[] = []) {
  return findListQueries(keywords).some(
    (q) => Array.isArray(q.state.data) && q.state.data.length > 0,
  )
}

/** 商品1件のキャッシュで、キーにその商品の id を含むもの */
export function hasDetailQueryWithId() {
  return queryClient
    .getQueryCache()
    .getAll()
    .some((q) => {
      const data = q.state.data as { id?: unknown; stock?: unknown } | undefined
      if (!data || Array.isArray(data) || typeof data.id !== 'number') return false
      return q.queryKey.some((part) => part === data.id || part === String(data.id))
    })
}

/** 検索キーワードごとに、別々のキャッシュができているキーワードの数 */
export function countSearchKeywordsCached(keywords: string[]) {
  const queries = queryClient.getQueryCache().getAll()
  return keywords.filter((k) =>
    queries.some((q) => Array.isArray(q.state.data) && keyText(q).includes(k)),
  ).length
}

/** useMutation で成功した更新があるか */
export function hasSuccessfulMutation() {
  return queryClient
    .getMutationCache()
    .getAll()
    .some((m) => m.state.status === 'success')
}

/** PATCH(購入)のあとに、商品データの GET が出たか */
export function hasRefetchAfterPurchase() {
  const { requests } = apiStore.getSnapshot()
  const lastPatch = requests.findLastIndex((r) => r.method === 'PATCH' && r.status === 'success')
  if (lastPatch < 0) return false
  return requests
    .slice(lastPatch + 1)
    .some((r) => r.method === 'GET' && r.path.startsWith('/products'))
}
