// ============================================================
// ★ 編集するファイル ★ 編集してよいのは src/mission/ の中だけ
//
// 発展4: useMutation と invalidateQueries
// 画面: 商品詳細の「購入する」ボタン
// 前提: 一覧(ミッション1・2)と詳細(発展1)が useQuery になっていること
// 問題文: materials/missions.md
//
// 今の状態: 「購入する」を押すと、サーバー側の在庫は1つ減る。
//           ところが、詳細や一覧に表示される在庫は、古いまま変わらない。
// やること: useMutation で購入するように書き換える。
//           購入が成功したらキャッシュを無効化して、表示を最新の在庫に変える。
// ヒント:   useQueryClient() で QueryClient を取り出せる。
//           invalidateQueries({ queryKey: ['products'] }) は、
//           ['products'] で始まるキーのキャッシュを、まとめて無効化する。
// 正解条件:
//   - useMutation で購入している
//   - 購入が成功したあと、商品データが取得し直される(在庫の表示が最新になる)
//
// できたら、右の欄の「判定する」を押す。
// ============================================================

import { useState } from 'react'
import { purchaseProduct, type Product } from '../api/products'
import { PurchaseControl } from '../components/PurchaseControl'

type Props = {
  product: Product
}

export function PurchaseButton({ product }: Props) {
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handlePurchase = async () => {
    setIsPurchasing(true)
    setMessage(null)
    try {
      await purchaseProduct(product)
      setMessage('購入しました')
    } catch {
      setMessage('購入に失敗しました')
    } finally {
      setIsPurchasing(false)
    }
  }

  return (
    <PurchaseControl
      onPurchase={handlePurchase}
      isPurchasing={isPurchasing}
      soldOut={product.stock <= 0}
      message={message}
    />
  )
}
