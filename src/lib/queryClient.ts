import { QueryClient } from '@tanstack/react-query'

// アプリ全体で共有する QueryClient(キャッシュの本体)。
// main.tsx で QueryClientProvider に渡してある。
export const queryClient = new QueryClient()
