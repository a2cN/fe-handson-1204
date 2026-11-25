import { Link, Route, Routes } from 'react-router'
import { RequestPanel } from './components/RequestPanel'
import { ProductListPage } from './pages/ProductListPage'
import { ProductDetailPage } from './pages/ProductDetailPage'

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
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
      <RequestPanel />
    </div>
  )
}
