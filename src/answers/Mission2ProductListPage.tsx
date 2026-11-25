// 解答例: ミッション2
// ミッション1の解答に staleTime を足したもの。

import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/products'
import { ErrorView } from '../components/ErrorView'
import { LoadingView } from '../components/LoadingView'
import { ProductList } from '../components/ProductList'

export function Mission2ProductListPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    // staleTime: 取得したデータを「新鮮」とみなす時間(ミリ秒)。
    // 標準は 0 なので、一覧に戻るたびに裏で再取得される(ミッション1の解答)。
    // 30秒にすると、その間は一覧に戻ってもリクエストが出ない。
    staleTime: 30_000,
  })

  if (isPending) return <LoadingView />
  if (isError) return <ErrorView error={error} />

  return <ProductList products={data} />
}
