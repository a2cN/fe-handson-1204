// ============================================================
// ★ 編集するファイル ★ 編集してよいのは src/mission/ の中だけ
//
// 発展2: 検索条件を Query Key に含める
// 画面: http://localhost:5173/search(画面上部の「検索」)
// 問題文: materials/missions.md
//
// 今の状態: すでに useQuery を使っているが、キーワードを入れて検索しても、
//           結果が最初の一覧のまま変わらない。
// やること: キーワードを変えたら、結果も変わるように直す。
// ヒント:   TanStack Query は、queryKey が同じなら「同じデータ」とみなす。
// 正解条件:
//   - 2種類以上のキーワードで検索し、キーワードごとに別のキャッシュができている
//     (queryKey にキーワードが含まれている)
//
// できたら、右の欄の「判定する」を押す。
// ============================================================

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchProducts } from '../api/products'
import { ErrorView } from '../components/ErrorView'
import { LoadingView } from '../components/LoadingView'
import { ProductList } from '../components/ProductList'
import { SearchForm } from '../components/SearchForm'

export function SearchPage() {
  const [keyword, setKeyword] = useState('')

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['products', 'search'],
    queryFn: () => searchProducts(keyword),
  })

  return (
    <section>
      <SearchForm defaultValue={keyword} onSearch={setKeyword} />
      {isPending && <LoadingView />}
      {isError && <ErrorView error={error} />}
      {data && <ProductList products={data} title={keyword ? `「${keyword}」の検索結果` : "すべての商品"} />}
    </section>
  )
}
