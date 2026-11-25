// 購入ボタン(表示専用)。押したときの処理は親から受け取る。

type Props = {
  onPurchase: () => void
  isPurchasing: boolean
  soldOut: boolean
  message: string | null
}

export function PurchaseControl({ onPurchase, isPurchasing, soldOut, message }: Props) {
  return (
    <div className="purchase">
      <button type="button" onClick={onPurchase} disabled={isPurchasing || soldOut}>
        {soldOut ? '在庫切れ' : isPurchasing ? '購入中…' : '購入する'}
      </button>
      {message && <p className="purchase-message">{message}</p>}
    </div>
  )
}
