const formatter = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' })

export function formatPrice(price: number): string {
  return formatter.format(price)
}
