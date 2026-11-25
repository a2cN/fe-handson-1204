// ============================================================
// ★ 編集するファイル ★ 編集してよいのは src/mission/ の中だけ
//
// 発展1: 商品詳細を useQuery に置き換える
// 画面: 一覧から商品をクリックした先(例: http://localhost:5173/products/4)
// 問題文: materials/missions.md
//
// 今の状態: 商品の詳細を fetch + useEffect で取得している。
//           同じ商品を開くたびに、取得し直している。
// やること: 一覧と同じように、useQuery に置き換える。
// ヒント:   商品ごとにキャッシュを分けるには、queryKey に商品の id を含める。
// 正解条件:
//   - 商品詳細を useQuery で取得していて、queryKey に商品の id が含まれている
//
// できたら、右の欄の「判定する」を押す。
// ============================================================

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchProduct, type Product } from '../api/products'
import { ErrorView } from '../components/ErrorView'
import { LoadingView } from '../components/LoadingView'
import { ProductDetail } from '../components/ProductDetail'
import { PurchaseButton } from './PurchaseButton'

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

  return (
    <ProductDetail
      product={current.product}
      actions={<PurchaseButton product={current.product} />}
    />
  )
}
