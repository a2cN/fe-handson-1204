// ★ ミッションで書き換えるファイル ★
// 今は fetch + useEffect で商品一覧を取得している。
// これを TanStack Query の useQuery に置き換える。

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
