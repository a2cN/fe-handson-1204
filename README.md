# TanStack Query ハンズオン

商品一覧の画面を題材に、`fetch + useEffect` で書かれたデータ取得を、TanStack Query の `useQuery` に置き換えます。

**問題文は [materials/missions.md](materials/missions.md) にあります。** 参加者向けの資料は `materials/` にまとめています。

## 準備

必要なもの: **Node.js 26 以上**

```sh
npm ci
npm run dev
```

ブラウザで http://localhost:5173 を開きます。

- `npm run dev` は、アプリ(ポート 5173)とモックAPI(json-server、ポート 3001)を同時に起動します。
- **商品一覧の取得**には、わざと **3秒** の遅延を入れています(詳細・検索・購入には入れていません)。
- 画面右側の欄に、**API リクエストの回数と履歴**が表示されます。
- 商品データ(在庫など)は、`npm run dev` を起動するたびに初期状態に戻ります。

## 編集するファイル

**編集するのは `src/mission/` の中だけです。** ほかのファイルは触らなくて大丈夫です。

| ファイル | 課題 | 画面 |
|---|---|---|
| `src/mission/ProductListPage.tsx` | **ミッション1・2**(必須) | http://localhost:5173/ |
| `src/mission/ProductDetailPage.tsx` | 発展1: 商品詳細を `useQuery` に置き換える | 一覧から商品をクリック |
| `src/mission/SearchPage.tsx` | 発展2: 検索条件を Query Key に含める | http://localhost:5173/search |
| `src/mission/DevtoolsSetup.tsx` | 発展3: TanStack Query Devtools を使う | どの課題ページでも |
| `src/mission/PurchaseButton.tsx` | 発展4: `useMutation` と `invalidateQueries` | 商品詳細の「購入する」ボタン |

各ファイルの先頭に、`★` 付きの説明(今の状態、やること、ヒント、**正解条件**)があります。内容は[問題文](materials/missions.md)と同じです。

## 正解の判定

できたと思ったら、画面右上の **「判定する」** を押します。

- 正解条件を満たした課題は、**クリアのカード**が出て、**バッジ**に ✅ が付きます。
- まだの課題は、どの条件が足りないかが表示されます。次に何をすればよいかのヒントにしてください。
- 判定は、実際に画面を操作した結果で行います。コードを書いたら、画面でも操作してから押してください。
- 発展3(Devtools)は判定の対象外です。画面で自分の目で確かめてください。

各課題の正解条件は、[問題文](materials/missions.md)に書いてあります。

発展課題は、1 → 4 の順に進めるのがおすすめです。発展4は、一覧と詳細が `useQuery` になっていることが前提です。

```
src/
├── mission/        ← ★ 参加者が編集するのはここだけ
├── api/            データ取得の関数(fetchProducts など)。読むだけ
├── components/     見た目の部品。触らなくてよい
├── answers/        解答例。まずは自分で解いてから見る
├── judge/          正解の判定とバッジ。触らなくてよい
└── ...
materials/          参加者向けの資料(問題文、技術の解説)
docs/               講座の企画、講師向けの資料
```

## 解答例

解答例は、URL を直接入力して開きます(画面にリンクはありません)。

| URL | 内容 | コード |
|---|---|---|
| http://localhost:5173/answers/mission1 | ミッション1 | `src/answers/Mission1ProductListPage.tsx` |
| http://localhost:5173/answers/mission2 | ミッション2 | `src/answers/Mission2ProductListPage.tsx` |
| http://localhost:5173/answers/advanced | 発展1〜4 | 下の表 |

発展課題の解答例(`/answers/advanced`)の中身:

| 課題 | 画面 | コード |
|---|---|---|
| 発展1: 商品詳細 | 一覧から商品をクリック | `src/answers/AnswerProductDetailPage.tsx` |
| 発展2: 検索 | 画面上部の「検索」 | `src/answers/AnswerSearchPage.tsx` |
| 発展3: Devtools | 画面左下のボタン | `src/answers/AnswerScope.tsx` |
| 発展4: 購入 | 商品詳細の「購入する」 | `src/answers/AnswerPurchaseButton.tsx` |
