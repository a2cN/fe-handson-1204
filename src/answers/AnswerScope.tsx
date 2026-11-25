import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from 'react-router'
import { ScopeBaseContext } from '../components/scopeBase'
import { ScopeNav } from '../components/ScopeNav'

// 解答例のページを、専用の QueryClient で包むレイアウト。
// 一覧と詳細を行き来しても、このレイアウトは残るのでキャッシュも残る。

type Props = {
  client: QueryClient
  base: string
  title: string
  /** 発展課題の解答例だけ true: 検索へのナビと Devtools を出す */
  advanced?: boolean
}

export function AnswerScope({ client, base, title, advanced = false }: Props) {
  return (
    <QueryClientProvider client={client}>
      <ScopeBaseContext.Provider value={base}>
        <p className="answer-banner">解答例: {title}</p>
        {advanced && <ScopeNav />}
        <Outlet />
        {/* 発展課題「Devtools を使う」の解答 */}
        {advanced && <ReactQueryDevtools buttonPosition="bottom-left" />}
      </ScopeBaseContext.Provider>
    </QueryClientProvider>
  )
}
