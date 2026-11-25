import { apiFetch } from './client'

export type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  description: string
}

// 遅延をかけるのは、ミッション1・2の対象である「商品一覧の取得」だけ。
// 詳細・検索・購入(発展課題)は、待たされずに試せるよう遅延をかけない。

/** 商品一覧を取得する(3秒の遅延あり) */
export function fetchProducts(): Promise<Product[]> {
  return apiFetch<Product[]>('/products', { delay: true })
}

/** 商品を1件取得する */
export function fetchProduct(id: number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`)
}

/** キーワードで商品を検索する(空なら全件) */
export function searchProducts(keyword: string): Promise<Product[]> {
  const q = keyword.trim()
  return apiFetch<Product[]>(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
}

/** 商品を1つ購入する(在庫を1減らす) */
export function purchaseProduct(product: Product): Promise<Product> {
  return apiFetch<Product>(`/products/${product.id}`, {
    method: 'PATCH',
    body: { stock: product.stock - 1 },
  })
}
