import type { ReactNode } from 'react'
import { Link } from 'react-router'
import type { Product } from '../api/products'
import { formatPrice } from './formatPrice'
import { useScopeBase } from './scopeBase'

type Props = {
  product: Product
  /** 購入ボタンなどを差し込む場所(発展課題で使う) */
  actions?: ReactNode
}

export function ProductDetail({ product, actions }: Props) {
  const base = useScopeBase()
  return (
    <article className="product-detail">
      {/* 課題では / へ、解答例では /answers/mission1 などへ戻る */}
      <Link to={base || '/'} className="back-link">
        ← 一覧へ戻る
      </Link>
      <span className="product-category">{product.category}</span>
      <h1 className="page-title">{product.name}</h1>
      <p className="product-price">{formatPrice(product.price)}</p>
      <p>{product.description}</p>
      <p className="product-stock">在庫: {product.stock} 点</p>
      {actions}
    </article>
  )
}
