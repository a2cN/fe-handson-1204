import { QueryClient } from '@tanstack/react-query'

// 解答例ごとに専用の QueryClient(キャッシュ)を用意する。
// 参加者のページや、ほかの解答例とキャッシュを共有しないため。
export const mission1QueryClient = new QueryClient()
export const mission2QueryClient = new QueryClient()
export const advancedQueryClient = new QueryClient()
