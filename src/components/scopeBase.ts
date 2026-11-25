import { createContext, useContext } from 'react'

// ページのまとまり(課題、解答例1、解答例2、発展課題の解答例)ごとの基準パス。
// 課題は ''、解答例は '/answers/mission1' など。
// 一覧・詳細・検索へのリンクは、この基準パスから組み立てる。
export const ScopeBaseContext = createContext('')

export function useScopeBase() {
  return useContext(ScopeBaseContext)
}
