// 解答例: ミッション1
// fetch + useEffect を useQuery に置き換えたもの。

import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/products'
import { ErrorView } from '../components/ErrorView'
import { LoadingView } from '../components/LoadingView'
import { ProductList } from '../components/ProductList'

export function Mission1ProductListPage() {
  const { data, isPending, isError, error } = useQuery({
    // queryKey: キャッシュの名前。同じキーなら同じキャッシュを使う
    queryKey: ['products'],
    // queryFn: データを取得する関数。Promise を返せばよい
    queryFn: fetchProducts,
  })

  // isPending: まだデータがない(初回の読み込み中)
  if (isPending) return <LoadingView />
  // isError: 取得に失敗した(標準では3回まで自動で再試行してから、こうなる)
  if (isError) return <ErrorView error={error} />

  // ここまで来れば data は必ずある(型も Product[] に絞り込まれる)
  return <ProductList products={data} />
}
