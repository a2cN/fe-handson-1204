import { Link } from 'react-router'
import type { Product } from '../api/products'
import { formatPrice } from './formatPrice'
import { useScopeBase } from './scopeBase'

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  const base = useScopeBase()
  return (
    // 課題では /products/1、解答例では /answers/mission1/products/1 になる
    <Link to={`${base}/products/${product.id}`} className="product-card">
      <span className="product-category">{product.category}</span>
      <span className="product-name">{product.name}</span>
      <span className="product-price">{formatPrice(product.price)}</span>
      <span className="product-stock">在庫 {product.stock}</span>
    </Link>
  )
}
