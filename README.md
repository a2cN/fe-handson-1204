# TanStack Query ハンズオン

TanStack Query を使ったサーバー状態の管理(データの取得、キャッシュ、更新)を、手を動かして体験するハンズオンです。

題材は、小さな商品ショップのアプリです。最初は `fetch + useEffect` で書かれているデータ取得を、課題を解きながら TanStack Query に置き換えていきます。API にはわざと遅延を入れてあり、リクエストの回数も画面に表示されるので、キャッシュの効果を目と数字で確かめられます。課題を解いたら「判定する」ボタンで正解を確かめ、バッジを集めていきます。

## 資料

ハンズオンの資料は `materials/` にまとめています。まずは問題文を開いてください。

| 資料 | 内容 |
|---|---|
| [問題文](materials/missions.md) | 課題ごとの、今の状態、やること、ヒント、正解条件 |
| [資料の目次](materials/README.md) | `materials/` にある資料の一覧(技術の解説も、今後ここに追加します) |

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

## 課題一覧

ミッション1・2のクリアを目指します。早く終わったかたは、発展1〜4に進んでください(1 → 4 の順がおすすめ)。

| 課題 | 内容 | 編集するファイル | 画面 |
|---|---|---|---|
| **ミッション1** | 商品一覧の取得を `useQuery` に置き換える | `src/mission/ProductListPage.tsx` | http://localhost:5173/ |
| **ミッション2** | `staleTime` で、一覧に戻ったときの再取得をなくす | `src/mission/ProductListPage.tsx` | http://localhost:5173/ |
| 発展1 | 商品詳細の取得を `useQuery` に置き換える | `src/mission/ProductDetailPage.tsx` | 一覧から商品をクリック |
| 発展2 | 検索条件を Query Key に含める | `src/mission/SearchPage.tsx` | http://localhost:5173/search |
| 発展3 | TanStack Query Devtools でキャッシュを見る | `src/mission/DevtoolsSetup.tsx` | どの課題の画面でも |
| 発展4 | `useMutation` と `invalidateQueries` で購入を反映する | `src/mission/PurchaseButton.tsx` | 商品詳細の「購入する」ボタン |

課題の詳しい内容(今の状態、やること、ヒント、正解条件)は、[問題文](materials/missions.md)と、各ファイルの先頭の `★` 付きのコメントに書いてあります。どちらも同じ内容です。

## 編集するファイル

**編集するのは `src/mission/` の中だけです。** ほかのファイルは触らなくて大丈夫です。

## 正解の判定

できたと思ったら、画面右上の **「判定する」** を押します。

- 正解条件を満たした課題は、**クリアのカード**が出て、**バッジ**に ✅ が付きます。
- まだの課題は、どの条件が足りないかが表示されます。次に何をすればよいかのヒントにしてください。
- 判定は、実際に画面を操作した結果で行います。コードを書いたら、画面でも操作してから押してください。
- 発展3(Devtools)は判定の対象外です。画面で自分の目で確かめてください。

各課題の正解条件は、[問題文](materials/missions.md)に書いてあります。

## ディレクトリ構成

```
src/
├── mission/        ← ★ 編集するのはここだけ
├── api/            データ取得の関数(fetchProducts など)。読むだけ
├── components/     見た目の部品。触らなくてよい
├── answers/        解答例。まずは自分で解いてから見る
├── judge/          正解の判定とバッジ。触らなくてよい
└── ...
materials/          ハンズオンの資料(問題文、技術の解説)
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
