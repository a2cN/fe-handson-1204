// 課題ごとの判定条件と、クリアのカードに出す文面。

import { judgeEvents } from './events'
import {
  countSearchKeywordsCached,
  hasDetailQueryWithId,
  hasListData,
  hasRefetchAfterPurchase,
  hasSuccessfulMutation,
} from './inspect'

export type Check = {
  label: string
  passed: () => boolean
}

export type Mission = {
  id: string
  badge: string
  title: string
  learned: string
  checks: Check[]
}

const keywords = () => judgeEvents.keywords()

export const missions: Mission[] = [
  {
    id: 'mission1',
    badge: 'M1',
    title: 'ミッション1: useQuery に置き換える',
    learned: 'useQuery は queryKey と queryFn を渡すだけで、取得・読み込み中・エラーの状態をまとめて扱える。',
    checks: [
      { label: 'useQuery で商品一覧を取得している', passed: () => hasListData(keywords()) },
      { label: '読み込み中の表示が出た', passed: () => judgeEvents.has('list-loading-shown') },
      {
        label: '「エラーを発生させる」をオンにしたとき、エラー表示が出た',
        passed: () => judgeEvents.has('list-error-shown'),
      },
    ],
  },
  {
    id: 'mission2',
    badge: 'M2',
    title: 'ミッション2: キャッシュを体験する',
    learned: 'staleTime の間はデータを「新鮮」とみなし、画面を開き直しても再取得しない。',
    checks: [
      {
        label: '一覧 → 詳細 → 一覧と戻ったとき、一覧のリクエストが増えなかった',
        passed: () => judgeEvents.has('list-returned-without-refetch'),
      },
    ],
  },
  {
    id: 'advanced1',
    badge: '発1',
    title: '発展1: 商品詳細を useQuery に置き換える',
    learned: 'queryKey に id を含めると、商品ごとに別々のキャッシュになる。',
    checks: [
      {
        label: '商品詳細を useQuery で取得している(キーに商品の id を含む)',
        passed: hasDetailQueryWithId,
      },
    ],
  },
  {
    id: 'advanced2',
    badge: '発2',
    title: '発展2: 検索条件を Query Key に含める',
    learned: 'queryKey に検索条件を含めると、条件が変わったときに自動で取得し直し、条件ごとにキャッシュされる。',
    checks: [
      {
        label: '2種類以上のキーワードで検索し、それぞれ別のキャッシュができた',
        passed: () => countSearchKeywordsCached(keywords()) >= 2,
      },
    ],
  },
  {
    id: 'advanced4',
    badge: '発4',
    title: '発展4: useMutation と invalidateQueries',
    learned: '更新のあとに invalidateQueries で関連するキャッシュを無効化すると、表示が最新のデータに変わる。',
    checks: [
      { label: 'useMutation で購入した', passed: hasSuccessfulMutation },
      { label: '購入のあと、商品データが取得し直された', passed: hasRefetchAfterPurchase },
    ],
  },
]
