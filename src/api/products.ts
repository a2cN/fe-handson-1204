import { apiFetch } from './client'

export type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  description: string
}

/** 商品一覧を取得する */
export function fetchProducts(): Promise<Product[]> {
  return apiFetch<Product[]>('/products')
}

/** 商品を1件取得する */
export function fetchProduct(id: number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`)
}
