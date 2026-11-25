// 解答例: 発展課題「useMutation と invalidateQueries」

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { purchaseProduct, type Product } from '../api/products'
import { PurchaseControl } from '../components/PurchaseControl'

type Props = {
  product: Product
}

export function AnswerPurchaseButton({ product }: Props) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    // mutationFn: 更新する関数(useQuery の queryFn にあたる)
    mutationFn: () => purchaseProduct(product),
    // 成功したら、['products'] で始まるキャッシュ(一覧・詳細・検索)をすべて無効化する。
    // 表示中のものはすぐに取得し直され、在庫の表示が最新になる。
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })

  const message = mutation.isSuccess
    ? '購入しました'
    : mutation.isError
      ? '購入に失敗しました'
      : null

  return (
    <PurchaseControl
      onPurchase={() => mutation.mutate()}
      isPurchasing={mutation.isPending}
      soldOut={product.stock <= 0}
      message={message}
    />
  )
}
