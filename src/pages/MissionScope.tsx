import { Outlet } from 'react-router'
import { ScopeBaseContext } from '../components/scopeBase'
import { ScopeNav } from '../components/ScopeNav'
import { useReportReturnToList } from '../judge/useJudgeReport'
import { DevtoolsSetup } from '../mission/DevtoolsSetup'

// 課題のページ(/、/products/:id、/search)を包むレイアウト。
// QueryClient は main.tsx のもの(アプリ全体で1つ)を使う。
export function MissionScope() {
  // 判定用: 詳細から一覧に戻ったときのリクエストを見張る(ミッション2)
  useReportReturnToList()

  return (
    <ScopeBaseContext.Provider value="">
      <ScopeNav />
      <Outlet />
      <DevtoolsSetup />
    </ScopeBaseContext.Provider>
  )
}
