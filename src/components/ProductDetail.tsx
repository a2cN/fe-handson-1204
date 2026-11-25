import { Link } from 'react-router'
import type { Product } from '../api/products'
import { formatPrice } from './formatPrice'

type Props = {
  product: Product
}

export function ProductDetail({ product }: Props) {
  return (
    <article className="product-detail">
      <Link to="/" className="back-link">
        ← 一覧へ戻る
      </Link>
      <span className="product-category">{product.category}</span>
      <h1 className="page-title">{product.name}</h1>
      <p className="product-price">{formatPrice(product.price)}</p>
      <p>{product.description}</p>
      <p className="product-stock">在庫: {product.stock} 点</p>
    </article>
  )
}
