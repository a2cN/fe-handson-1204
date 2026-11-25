import type { Product } from '../api/products'
import { ProductCard } from './ProductCard'

// 表示専用のコンポーネント(データの取得はしない)。
// 見た目は後で Claude Design のデザインに差し替える。

type Props = {
  products: Product[]
}

export function ProductList({ products }: Props) {
  return (
    <section>
      <h1 className="page-title">商品一覧</h1>
      <ul className="product-grid">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
