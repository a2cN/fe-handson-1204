import type { Product } from '../api/products'
import { ProductCard } from './ProductCard'

// 表示専用のコンポーネント(データの取得はしない)。
// 見た目は後で Claude Design のデザインに差し替える。

type Props = {
  products: Product[]
  title?: string
}

export function ProductList({ products, title = '商品一覧' }: Props) {
  return (
    <section>
      <h1 className="page-title">{title}</h1>
      {products.length === 0 && <p className="status-view">該当する商品はありません。</p>}
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
