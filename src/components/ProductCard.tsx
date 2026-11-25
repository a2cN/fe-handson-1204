import { Link } from 'react-router'
import type { Product } from '../api/products'
import { formatPrice } from './formatPrice'

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <span className="product-category">{product.category}</span>
      <span className="product-name">{product.name}</span>
      <span className="product-price">{formatPrice(product.price)}</span>
    </Link>
  )
}
