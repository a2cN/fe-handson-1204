import { Link, Route, Routes } from 'react-router'
import { ProductDetailPage as AnswerProductDetailPage } from './answers/AnswerProductDetailPage'
import { AnswerScope } from './answers/AnswerScope'
import { SearchPage as AnswerSearchPage } from './answers/AnswerSearchPage'
import { ProductListPage as Mission1ProductListPage } from './answers/Mission1ProductListPage'
import { ProductListPage as Mission2ProductListPage } from './answers/Mission2ProductListPage'
import {
  advancedQueryClient,
  mission1QueryClient,
  mission2QueryClient,
} from './answers/queryClients'
import { RequestPanel } from './components/RequestPanel'
import { JudgePanel } from './judge/JudgePanel'
import { ProductDetailPage } from './mission/ProductDetailPage'
import { ProductListPage } from './mission/ProductListPage'
import { SearchPage } from './mission/SearchPage'
import { MissionScope } from './pages/MissionScope'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">
          Handson Shop
        </Link>
      </header>
      <main className="main">
        <Routes>
          {/* 課題のページ(src/mission/ を編集する) */}
          <Route element={<MissionScope />}>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>

          {/* 解答例(それぞれ専用のキャッシュを持つ)。画面にリンクは置かず、URL を直接入力して開く */}
          <Route
            path="/answers/mission1"
            element={
              <AnswerScope
                client={mission1QueryClient}
                base="/answers/mission1"
                title="ミッション1(useQuery)"
              />
            }
          >
            <Route index element={<Mission1ProductListPage />} />
            <Route path="products/:id" element={<AnswerProductDetailPage />} />
          </Route>
          <Route
            path="/answers/mission2"
            element={
              <AnswerScope
                client={mission2QueryClient}
                base="/answers/mission2"
                title="ミッション2(staleTime)"
              />
            }
          >
            <Route index element={<Mission2ProductListPage />} />
            <Route path="products/:id" element={<AnswerProductDetailPage staleTime={30_000} />} />
          </Route>
          <Route
            path="/answers/advanced"
            element={
              <AnswerScope
                client={advancedQueryClient}
                base="/answers/advanced"
                title="発展課題(詳細・検索・Devtools・購入)"
                advanced
              />
            }
          >
            <Route index element={<Mission2ProductListPage />} />
            <Route
              path="products/:id"
              element={<AnswerProductDetailPage staleTime={30_000} withPurchase />}
            />
            <Route path="search" element={<AnswerSearchPage />} />
          </Route>

          {/* どれにも当てはまらない URL */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <div className="sidebar">
        <JudgePanel />
        <RequestPanel />
      </div>
    </div>
  )
}
