// 解答例: 商品詳細(発展課題「商品詳細を useQuery に置き換える」の解答も兼ねる)
// 商品ごとにキャッシュを分けるため、queryKey に id を含める。

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { fetchProduct } from '../api/products'
import { ErrorView } from '../components/ErrorView'
import { LoadingView } from '../components/LoadingView'
import { ProductDetail } from '../components/ProductDetail'
import { AnswerPurchaseButton } from './AnswerPurchaseButton'

type Props = {
  /** 解答例2 では一覧と同じく 30 秒を渡す。省略すると標準の 0 */
  staleTime?: number
  /** 発展課題の解答例だけ true: 購入ボタン(useMutation)を出す */
  withPurchase?: boolean
}

export function AnswerProductDetailPage({ staleTime, withPurchase = false }: Props) {
  const id = Number(useParams().id)

  const { data, isPending, isError, error } = useQuery({
    // ['products', 4] と ['products', 5] は別のキャッシュになる
    queryKey: ['products', id],
    queryFn: () => fetchProduct(id),
    staleTime,
  })

  if (isPending) return <LoadingView />
  if (isError) return <ErrorView error={error} />

  return (
    <ProductDetail
      product={data}
      actions={withPurchase ? <AnswerPurchaseButton product={data} /> : undefined}
    />
  )
}
