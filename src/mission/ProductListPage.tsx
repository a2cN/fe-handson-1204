// ============================================================
// ★ 編集するファイル ★ 編集してよいのは src/mission/ の中だけ
//
// ミッション1: useQuery に置き換える(必須)
// ミッション2: キャッシュを体験する(必須)
// 画面: http://localhost:5173/
// 問題文: materials/missions.md
//
// ■ ミッション1
// 今の状態: 商品一覧を fetch + useEffect で取得している。
//           読み込み中やエラーの状態も、useState で自分で管理している。
// やること: TanStack Query の useQuery に置き換える。
//           読み込み中とエラーの表示も、useQuery が返す状態を使って出す。
// ヒント:   取得する関数は fetchProducts(src/api/products.ts)が、もう用意されている。
// 正解条件:
//   - useQuery で商品一覧を取得している
//   - 読み込み中は <LoadingView /> を表示する
//   - エラーのときは <ErrorView /> を表示する
//     (右の欄の「エラーを発生させる」をオンにして再読み込みすると確かめられる。
//      自動で再試行するので、エラー表示まで約20秒かかる)
//
// ■ ミッション2(ミッション1の続き)
// 今の状態: 一覧 → 詳細 → 「一覧へ戻る」と操作すると、一覧はすぐに表示されるが、
//           一覧のリクエストがまた出ている(右の欄で確かめる)。
// やること: 一覧に戻ったとき、しばらくの間はリクエストが出ないようにする。
// ヒント:   useQuery には、取得したデータを「新鮮」とみなす時間を決めるオプションがある。
// 正解条件:
//   - 一覧 → 詳細 → 一覧と戻ったとき、一覧のリクエストが増えない
//
// できたら、右の欄の「判定する」を押す。
// ============================================================

import { useEffect, useState } from 'react'
import { fetchProducts, type Product } from '../api/products'
import { ErrorView } from '../components/ErrorView'
import { LoadingView } from '../components/LoadingView'
import { ProductList } from '../components/ProductList'

export function ProductListPage() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let ignore = false

    fetchProducts()
      .then((data) => {
        if (!ignore) setProducts(data)
      })
      .catch((e: unknown) => {
        if (!ignore) setError(e instanceof Error ? e : new Error(String(e)))
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  if (isLoading) return <LoadingView />
  if (error) return <ErrorView error={error} />
  if (!products) return null

  return <ProductList products={products} />
}
