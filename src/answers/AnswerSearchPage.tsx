// 解答例: 発展課題「検索条件を Query Key に含める」

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchProducts } from '../api/products'
import { ErrorView } from '../components/ErrorView'
import { LoadingView } from '../components/LoadingView'
import { ProductList } from '../components/ProductList'
import { SearchForm } from '../components/SearchForm'

export function AnswerSearchPage() {
  const [keyword, setKeyword] = useState('')

  const { data, isPending, isError, error } = useQuery({
    // キーワードを queryKey に含める。
    // キーワードが変わると別のキャッシュになり、自動で取得し直す。
    // 一度検索したキーワードに戻ると、キャッシュからすぐ表示される。
    queryKey: ['products', 'search', keyword],
    queryFn: () => searchProducts(keyword),
  })

  return (
    <section>
      <SearchForm defaultValue={keyword} onSearch={setKeyword} />
      {isPending && <LoadingView />}
      {isError && <ErrorView error={error} />}
      {data && (
        <ProductList products={data} title={keyword ? `「${keyword}」の検索結果` : 'すべての商品'} />
      )}
    </section>
  )
}
