// 商品詳細ページ(ミッションの対象外)。
// 一覧から移動して「戻る」ための画面。

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchProduct, type Product } from '../api/products'
import { ErrorView } from '../components/ErrorView'
import { LoadingView } from '../components/LoadingView'
import { ProductDetail } from '../components/ProductDetail'

type Result = { id: number; product?: Product; error?: Error }

export function ProductDetailPage() {
  const id = Number(useParams().id)
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    let ignore = false

    fetchProduct(id)
      .then((product) => {
        if (!ignore) setResult({ id, product })
      })
      .catch((e: unknown) => {
        if (!ignore) setResult({ id, error: e instanceof Error ? e : new Error(String(e)) })
      })

    return () => {
      ignore = true
    }
  }, [id])

  // 別の商品の結果が残っていたら、まだ読み込み中として扱う
  const current = result?.id === id ? result : null

  if (current?.error) return <ErrorView error={current.error} />
  if (!current?.product) return <LoadingView />

  return <ProductDetail product={current.product} />
}
