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
  /** 必須(ミッション1・2)か */
  required: boolean
  /** 「今やること」に出す、ひとことの目標 */
  goal: string
  /** 編集するファイル */
  file: string
  /** 判定の前にする操作の手順 */
  steps: string[]
  learned: string
  checks: Check[]
}

const keywords = () => judgeEvents.keywords()

export const missions: Mission[] = [
  {
    id: 'mission1',
    badge: 'M1',
    title: 'ミッション1: useQuery に置き換える',
    required: true,
    goal: '商品一覧の取得を、fetch + useEffect から useQuery に置き換えよう',
    file: 'src/mission/ProductListPage.tsx',
    steps: [
      'コードを書き換えたら、一覧が表示されるのを確かめる',
      '「エラーを発生させる」をオンにして、ページを再読み込みする',
      'エラー表示が出るまで待つ(自動で再試行するので約20秒)',
      '「エラーを発生させる」をオフに戻して、「判定する」を押す',
    ],
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
    required: true,
    goal: '一覧に戻ったとき、一覧のリクエストが出ないようにしよう',
    file: 'src/mission/ProductListPage.tsx',
    steps: [
      'まず今のまま、一覧 → 商品をクリック → 「一覧へ戻る」と操作する',
      '右の欄を見ると、一覧のリクエスト(GET /products)がまた出ている',
      'コードを直したら、同じ操作をもう一度する',
      '一覧のリクエストが増えなくなったら、「判定する」を押す',
    ],
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
    required: false,
    goal: '商品詳細の取得も、useQuery に置き換えよう',
    file: 'src/mission/ProductDetailPage.tsx',
    steps: ['コードを書き換えたら、一覧から商品を開く', '詳細が表示されたら、「判定する」を押す'],
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
    required: false,
    goal: '検索結果がキーワードで変わるように直そう',
    file: 'src/mission/SearchPage.tsx',
    steps: [
      '画面上部の「検索」を開き、今は結果が変わらないことを確かめる',
      'コードを直したら、2種類のキーワードで検索する(例: マウス、オーディオ)',
      '結果が変わったら、「判定する」を押す',
    ],
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
    required: false,
    goal: '購入したら、在庫の表示が最新になるようにしよう',
    file: 'src/mission/PurchaseButton.tsx',
    steps: [
      '商品詳細で「購入する」を押し、今は在庫の表示が変わらないことを確かめる',
      'コードを直したら、もう一度「購入する」を押す',
      '在庫の表示が減ったら、「判定する」を押す',
    ],
    learned: '更新のあとに invalidateQueries で関連するキャッシュを無効化すると、表示が最新のデータに変わる。',
    checks: [
      { label: 'useMutation で購入した', passed: hasSuccessfulMutation },
      { label: '購入のあと、商品データが取得し直された', passed: hasRefetchAfterPurchase },
    ],
  },
]
