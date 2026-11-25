import { NavLink } from 'react-router'
import { useScopeBase } from './scopeBase'

// 「一覧」と「検索」を切り替えるナビ。
// 課題では / と /search、発展課題の解答例では /answers/advanced と /answers/advanced/search を指す。
export function ScopeNav() {
  const base = useScopeBase()
  return (
    <nav className="scope-nav">
      <NavLink to={base || '/'} end>
        一覧
      </NavLink>
      <NavLink to={`${base}/search`}>検索</NavLink>
    </nav>
  )
}
